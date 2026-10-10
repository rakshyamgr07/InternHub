const Company = require("../model/companySchema")
const Internship = require("../model/internshipSchema")
const User = require("../model/userSchema")
const errorHandler = require("../utils/errorHandler")


async function postInternship(req, res) {
    try {
        const { title, description, skills, location, type, duration, stipend, deadline } = req.body
        const creator = req.user.id
        if (!title || !description || !creator) {
            return res.status(400).json({
                success: false,
                message: "please insert all the fields"
            })
        }

        const company = await Company.findOne({ creator })
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found. Please create a company first"
            })
        }
        const newInternship = await Internship.create({
            company: company._id,
            title, description, skills, location, type, duration, stipend,
            deadline
        })
        await Company.findByIdAndUpdate(creator, { $push: { internshipPosted: newInternship._id } })
        return res.status(200).json({
            success: true,
            messsage: "Internship created successfully",
            internship: newInternship
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function getInternships(req, res) {
    try {
        const internship = await Internship.find()
            .populate("company", "companyName logoUrl locatiob website")
            .sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            message: "Internship fetch successfully",
            internships: internship
        });
    } catch (error) {
        return handleError(res, error)
    }
}

async function getInternshipById(req, res) {
    try {
        const id = req.params.id
        console.log(id)
        // const creator = req.body
        // console.log(creator)
        const internship = await Internship.findById(id)
            .populate("company", "companyName logoUrl location website")
        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "internship fetched",
            internships: internship
        })
    } catch (error) {
        return errorHandler(res, error)
    }

}

async function deleteInternship(req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const creator = req.user.id
        console.log(creator)
        const internship = await Internship.findById(id)
        if (!internship) {
            return res.status(404).json({
                success: "false",
                message: "internship not found"
            })
        }
         // Delete applications related to this internship
    await Application.deleteMany({ internship: internship._id });
        const company = await Company.findOne({ creator })
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found "
            })
        }
        if (creator !== company.creator.toString()) {
            return res.status(403).json({
                success: false,
                message: "you can only delete your own internship"
            })
        }
        await Internship.deleteOne({ _id: id })
        return res.status(200).json({
            success: true,
            message: "internship deleted successfully"
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function updateInternship(req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const { title, description, skills, location,
            type, duration, stipend, deadline, status } = req.body

        const creator = req.user.id
        console.log(creator)
        const internship = await Internship.findById(id)
        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "internship not found",
            })
        }
        const company = await Company.findOne({
            _id: internship.company
        })

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }
        if (creator !== company.creator.toString()) { //internship._id object ma hunxw so it is needed to be converted to the string
            return res.status(403).json({
                success: false,
                message: "you can only update your own internships"
            })
        }

        await Internship.updateOne({ _id: id }, {
            title, description, skills, location,
            type, duration, stipend, deadline, status
        }, { new: true })
        const updatedinternship = await Internship.findById(id)
        return res.status(200).json({
            success: true,
            message: "internship updated successfully",
            internships: updatedinternship
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function searchInternships(req, res) {
    try {
        const { q, location } = req.query;

        if (!q && !location) {
            return res.status(400).json({
                success: false,
                message: "Please enter a search keyword or select a location"
            });
        }

        const filters = [];

        // Search keyword
        if (q) {
            filters.push({
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { description: { $regex: q, $options: "i" } },
                    { skills: { $regex: q, $options: "i" } }
                ]
            });
        }

        // Location filter
        if (location) {
            filters.push({
                location: { $regex: location, $options: "i" }
            });
        }

        const internships = await Internship.find({
            $and: filters
        }).populate("company", "companyName logoUrl");

        return res.status(200).json({
            success: true,
            message: "Search results fetched successfully",
            internships
        });

    } catch (error) {
        return errorHandler(res, error);
    }
}

 async function getCompanyInternships  (req, res) {
    try {
        const { companyId } = req.params;

        const internships = await Internship.find({
            company: companyId
        });

        return res.status(200).json({
            success: true,
            message: "Company internships fetched successfully",
            count: internships.length,
            internships
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch company internships",
            error: error.message
        });
    }
};
module.exports = { postInternship, getInternships, getInternshipById, deleteInternship, updateInternship, searchInternships ,getCompanyInternships}