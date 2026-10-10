const Company = require("../model/companySchema")
const User = require("../model/userSchema")
const errorHandler = require("../utils/errorHandler")
const fs = require("fs")
const { uploadImage, deleteImage } = require("../utils/uploadImage")
const Internship = require("../model/internshipSchema")


async function createCompany(req, res) {
    try {
        const { companyName, description, website, location } = req.body
        console.log("REQ BODY:", req.body);
        console.log("LOCATION:", location);
        const creator = req.user.id
        console.log(creator)
        if (!creator) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            })
        }
        const user = await User.findById(creator)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        if (user.role !== "company") {
            return res.status(403).json({
                success: false,
                message: "Only company users can create a company profile"
            })
        }
        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "Please insert the company name"
            })
        }
        const existingCompany = await Company.findOne({
            creator: creator
        })

        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "Company profile already exists"
            })
        }
        let logoUrl = ""
        let logoId = ""

        // Only upload when a file is actually provided
        if (req.file) {
            const image = req.file.path

            const result = await uploadImage(image)

            logoUrl = result.secure_url
            logoId = result.public_id

            fs.unlinkSync(image)
        }

        const company = await Company.create({
            creator: creator, companyName,
            logoUrl, logoId, description, website, location
        })
        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            company
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function getCompany(req, res) {
    try {
        const companies = await Company.find();

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Company Not Found"
            });
        }

        const companiesWithInternshipCount = await Promise.all(
            companies.map(async (company) => {

                const internshipCount = await Internship.countDocuments({
                    company: company._id
                });

                return {
                    ...company.toObject(),
                    internshipCount
                };
            })
        );

        return res.status(200).json({
            success: true,
            message: "Companies fetched successfully",
            companies: companiesWithInternshipCount
        });

    } catch (error) {
        return errorHandler(res, error);
    }
}
async function getCompanyById(req, res) {
    try {
        const id = req.params.id

        console.log("Company ID:", id)

        const company = await Company.findById(id)
            .populate("creator", "name email")

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Company fetched successfully",
            company: company
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function deleteCompany(req, res) {
    try {
        const id = req.params.id
        const creator = req.user.id

        const company = await Company.findById(id)

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }

        if (creator !== company.creator.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own company"
            })
        }
        // find all internships belong to company
        const internships = await Internship.find({ company: company._id }).select("_id");

        const internshipIds = internships.map((internship) => internship._id);

        // delete applications belong to  internships
        await Application.deleteMany({ internship: { $in: internshipIds } });

        // delete all internships belong to  company
        await Internship.deleteMany({ company: company._id });

        // delete company
        await Company.deleteOne({ _id: id })

        return res.status(200).json({
            success: true,
            message: "Company deleted successfully"
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function updateCompany(req, res) {
    try {
        const id = req.params.id
        const { companyName, description, website, location } = req.body
        const creator = req.user.id

        const company = await Company.findById(id)

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }

        if (creator !== company.creator.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own company"
            })
        }

        company.companyName = companyName
        company.description = description
        company.website = website
        company.location = location

        const updatedCompany = await company.save()
        if (req.file) {
            const logo = req.file.path;
            await deleteImage(Company.logoId);
            const { public_id, secure_url } = await uploadImage(logo)
            updatedCompany.logoUrl = secure_url;
            updatedCompany.logoId = public_id;
            fs.unlinkSync(logo)
        }
        await Company.updateOne({ _id: id }, { $set: updatedCompany })

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company: updatedCompany
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

module.exports = { createCompany, getCompany, getCompanyById, deleteCompany, updateCompany }