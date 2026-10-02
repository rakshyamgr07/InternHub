const Company = require("../model/companySchema")
const errorHandler = require("../utils/errorHandler")
const { generateJWT } = require("../utils/generateToken")


async function createCompany(req, res) {
    try {
        const { companyName, description, website, location } = req.body
        const creator = req.user
        console.log(creator)
        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "please insert the company name"
            })
        }
        const existingCompany = await Company.findOne({creator})
        if (existingCompany) {
            if (existingCompany.verify) {
                return res.status(400).json({
                    success: false,
                    message: "company profile already exist"
                })
            }
        }
        const newCompany = await Company.create({ creator, companyName, description, website, location })

        return res.status(200).json({
            success: true,
            messsage: "company created successfully",
            company: newCompany
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function getCompany(req, res) {
    try {
        const company = await Company.find()
        return res.status(200).json({
            success: true,
            message: "Company fetch successfully",
            companies: company
        });
    } catch (error) {
        return handleError(res, error)
    }
}

async function getCompanyById(req, res) {
    try {
        const id = req.params.id
        console.log(id)
        // const creator = req.body
        // console.log(creator)
        const company = await Company.findById(id)
            .populate("user", "name email")
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Company fetched",
            companies: company
        })
    } catch (error) {
        return errorHandler(res, error)
    }

}

async function deleteCompany(req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const creator = req.user
        console.log(creator)
        const company = await Company.findById(id)
        if (!company) {
            return res.status(404).json({
                success: "false",
                message: "company not found"
            })
        }
        if (creator !== company._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "you can only delete your own account"
            })
        }
        await Company.deleteOne({ _id: id })
        return res.status(200).json({
            success: true,
            message: "company deleted successfully"
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function updateCompany(req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const { companyName, description, website, location } = req.body

        const creator = req.user
        console.log(creator)
        const company = await Company.findById(id)
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "company not found",
            })
        }
        if (creator !== company._id.toString()) { //user._id object ma hunxw so it is needed to be converted to the string
            return res.status(403).json({
                success: false,
                message: "you can only update your own account"
            })
        }

        await Company.updateOne({ _id: id }, { companyName, description, website, location }, { new: true })
        const updateCompany = await Company.findById(id)
        return res.status(200).json({
            success: true,
            message: "company updated successfully",
            companies: updateCompany
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

module.exports = { createCompany, getCompany, getCompanyById, deleteCompany, updateCompany }