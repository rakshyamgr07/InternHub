const Application = require("../model/applicationSchema");
const Internship = require("../model/internshipSchema");
const errorHandler = require("../utils/errorHandler");

async function applyInternships(req,res){
    try{
        const {internshipId} = req.params
        const {coverLetter, resume} = req.body

        const applicant = req.user
        if(!applicant){
            return res.status(404).json({
                success:false,
                message:"please login first"
            })
        }
        if(!coverLetter){
            return res.status(400).json({
                success:false,
                message:"please insert cover letter also"
            })
        }

        const internship = await Internship.findById(internshipId)
        if(!internship){
            return res.status(404).json({
                success:false,
                message:"internship not found"
            })
        }
        if(internship.deadline && new Date() > new Date(internship.deadline)){
            return res.status(400).json({
                success : false,
                message:"application deadline has passed"
            })
        }

        const existingApplication = await Application.findOne({
            applicant:applicant,internship:internshipId
        })
        if(existingApplication){
            return res.status(400).json({
                success: false,
                message: "You have already applied for this internship"
            })
        }

         return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application: application
        })
    }catch(error){
        return errorHandler(res,error)
    }
}
module.exports = {applyInternships}