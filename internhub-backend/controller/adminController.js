const User = require("../model/userSchema")

async function getAllUsers(req, res) {
    try {

        const users = await User.find()
            .select("-password")//The - means exclude this field.

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.role === "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin cannot be deleted"
            })
        }

        await User.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}
async function getAllCompanies(req, res) {
     try {

        const companies = await Company.find()
            .populate("creator", "name email")

        return res.status(200).json({
            success: true,
            message: "Companies fetched successfully",
            companies
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}
async function verifyCompany(req, res) {
     try {

        const { id } = req.params

        const company = await Company.findById(id)

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }

        if (company.verify) {
            return res.status(400).json({
                success: false,
                message: "Company is already verified"
            })
        }

        company.verify = true

        await company.save()

        return res.status(200).json({
            success: true,
            message: "Company verified successfully",
            company
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}
async function deleteCompany(req, res) {
    try {

        const { id } = req.params

        const company = await Company.findById(id)

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }

        await Company.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: "Company deleted successfully"
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}
async function getAllInternships(req, res) {
     try {

        const internships = await Internship.find()
            .populate("company", "companyName location verify")

        return res.status(200).json({
            success: true,
            message: "Internships fetched successfully",
            internships
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}
async function deleteInternships(req, res) {
    try {

        const { id } = req.params

        const internship = await Internship.findById(id)

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            })
        }

        await Internship.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: "Internship deleted successfully"
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}
async function getAllApplications(req, res) {
    try {

        const applications = await Application.find()
            .populate("applicant", "name email")
            .populate("internship", "title company")

        return res.status(200).json({
            success: true,
            message: "Applications fetched successfully",
            applications
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}
async function getDashBoardStatus(req, res) {
    try {
        const totalUsers = await User.countDocuments()
        const totalStudents = await User.countDocuments({ role: "student" })
        const totalCompaniesUsers = await User.countDocuments({ role: "company" })
        const totalCompanies = await Company.countDocuments()
        const verifiedCompanies = await Company.countDocuments({ verify: true})
        const totalInternships = await Internship.countDocuments()
        const totalApplications = await Application.countDocuments()
        
        return res.status(200).json({
            success: true,
            message: "Dashboard statistics fetched successfully",
            statistics: {
                totalUsers,
                totalStudents,
                totalCompaniesUsers,
                totalCompanies,
                verifiedCompanies,
                totalInternships,
                totalApplications
            }
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}
module.exports = { getAllUsers, deleteUser, getAllCompanies, verifyCompany, deleteCompany, getAllInternships, deleteInternships, getAllApplications, getDashBoardStatus }