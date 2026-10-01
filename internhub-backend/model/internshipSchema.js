import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Remote", "On-site", "Hybrid"],
        required: true
    },
    requiredSkill: [
        {
            type: String,
            required: true
        }
    ],
    duration: {
        type: String,
        required: true
    },
    stipend: {
        type: String,
        default: "unpaid"
    },
    deadline: {
        type: Date,
        required: true
    },
    vacancies: {
        type: Number,
        default: 1
    },
    requirements: [
        {
            type: String
        }
    ],
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

}, { timestamps: true })
const Internship = mongoose.model("Internship", internshipSchema)
module.exports = Internship