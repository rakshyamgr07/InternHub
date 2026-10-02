const Internship = require("../model/internshipSchema")
const User = require("../model/userSchema")
const errorHandler = require("../utils/errorHandler")
const { generateJWT } = require("../utils/generateToken")


async function postInternship(req, res) {
    try {
        const { title, description, location, type, requiredSkill, duration, stipend, deadline, vacancies, requirements, status } = req.body
        if (!title || !description || !location || !type || !requiredSkill || !duration || !deadline || !requirements) {
            return res.status(400).json({
                success: false,
                message: "please insert all the fields"
            })
        }

        const creator = req.user
        const findUser = await User.findById(creator)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        let token = await generateJWT({
            id: newCompany._id,
            email: newCompany.email,
        })
        return res.status(200).json({
            success: true,
            messsage: "company created successfully",
            company: newCompany
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function getInternships(req, res) {
    try {
        const internship = await Internship.find()
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
        const creator = req.user
        console.log(creator)
        const internship = await Internship.findById(id)
        if (!internship) {
            return res.status(404).json({
                success: "false",
                message: "internship not found"
            })
        }
        if (creator !== internship._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "you can only delete your own account"
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
        const { title, description, location, type, requiredSkill, duration, stipend, deadline, vacancies, requirements, status } = req.body

        const creator = req.user
        console.log(creator)
        const internship = await Internship.findById(id)
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "internship not found",
            })
        }
        if (creator !== internship._id.toString()) { //user._id object ma hunxw so it is needed to be converted to the string
            return res.status(403).json({
                success: false,
                message: "you can only update your own account"
            })
        }

        await Internship.updateOne({ _id: id }, { title, description, location, type, requiredSkill, duration, stipend, deadline, vacancies, requirements, status }, { new: true })
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

module.exports = { postInternship, getInternships, getInternshipById, deleteInternship, updateInternship }