const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema(
    {
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship",
            required: true
        },

        coverLetter: {
            type: String,
            required: true
        },

        resume: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "pending",
                "reviewing",
                "shortlisted",
                "rejected",
                "accepted"
            ],
            default: "pending"
        }
    }, {timestamps: true}
)
const Application = mongoose.model("Application",applicationSchema)
module.exports = Application