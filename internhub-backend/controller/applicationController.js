const Application = require("../model/applicationSchema");
const Internship = require("../model/internshipSchema");
const User = require("../model/userSchema")
const errorHandler = require("../utils/errorHandler");
const fs = require("fs");
const { uploadResume, deleteResume } = require("../utils/uploadResume");
const { randomUUID } = require("crypto");
const Company = require("../model/companySchema");

async function applyInternships(req, res) {
    try {
        const { internshipId } = req.params
        const { coverLetter } = req.body
        const resume = req.file.path
        const creator = req.user.id
        console.log(req.user)
        console.log(req.params)
        console.log(req.body)
        const applicant = await User.findById(creator)
        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: "please login first"
            })
        }
        if (applicant.role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Only students can apply for internships"
            })
        }
        if (!coverLetter) {
            return res.status(400).json({
                success: false,
                message: "please insert cover letter also"
            })
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload your resume"
            })
        }
        const internship = await Internship.findById(internshipId)

        if (internship.status === "closed") {
            return res.status(400).json({
                success: false,
                message: "This internship is closed"
            })
        }
        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "internship not found"
            })
        }
        if (internship.deadline && new Date() > new Date(internship.deadline)) {
            return res.status(400).json({
                success: false,
                message: "application deadline has passed"
            })
        }

        const existingApplication = await Application.findOne({
            applicant: applicant, internship: internshipId
        })
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this internship"
            })
        }
        const { public_id, secure_url } = await uploadResume(resume)
        fs.unlinkSync(resume)
        // const resumeId = internship.title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().split(/\s+/).join("-") + "-" + randomUUID()

        const application = await Application.create({
            applicant: applicant, internship: internshipId,
            coverLetter: coverLetter, resumeUrl: secure_url,
            resumeId: public_id
        })
        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application: application
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function getMyApplications(req, res) {
    try {
        const applicantId = req.user.id
        const application = await Application.find({ applicant: applicantId })
            .populate("internship")
            .populate("applicant", "name email")

        return res.status(200).json({
            success: true,
            message: "Applications fetched successfully",
            applications: application
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function getApplicationById(req, res) {
    try {
        const { id } = req.params
        const application = await Application.findById(id)
            .populate("internship")
            .populate("applicant", "name email")

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Applications fetched successfully",
            applications: application
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function getInternshipApplications(req, res) {
    try {
        const { internshipId } = req.params
        const creator = req.user.id
        const internship = await Internship.findById(internshipId)
        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            })
        }
        const company = await Company.findById(internship.company)
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }

        if (creator !== company.creator.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to view these applications"
            })
        }

        const applications = await Application.find({ internship: internshipId })
            .populate("applicant", "name email")
            .populate("internship", "title")


        return res.status(200).json({
            success: true,
            message: "Applications fetched successfully",
            applications
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function updateApplicationStatus(req, res) {
    try {
        const { id } = req.params
        const { status } = req.body
        const creator = req.user.id
        const application = await Application.findById(id)
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }

        const internship = await Internship.findById(application.internship)
        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            })
        }

        const company = await Company.findById(
            internship.company
        )

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            })
        }
        if (creator !== company.creator.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this application"
            })
        }
        const allowedStatus = [
            "pending",
            "reviewing",
            "shortlisted",
            "rejected",
            "accepted"
        ]

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status"
            })
        }


        application.status = status

        await application.save()


        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function deleteApplication(req,res){
    try {
        const { id } = req.params
        const applicantId = req.user.id
        const application = await Application.findById(id)
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }
        if (applicantId !== application.applicant.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this application"
            })
        }
        if (application.resumeId) {
            await deleteResume(application.resumeId)
        }

        await Application.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Application deleted successfully"
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}


module.exports = { applyInternships, getMyApplications, getApplicationById, getInternshipApplications, updateApplicationStatus ,deleteApplication}