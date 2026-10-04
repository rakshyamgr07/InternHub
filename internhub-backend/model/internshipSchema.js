const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    skills: {
        type: [String]
    },

    location: {
        type: String
    },

    type: {
        type: String,
        enum: ["remote", "onsite", "hybrid"]
    },

    duration: {
        type: String
    },

    stipend: {
        type: String
    },

    deadline: {
        type: Date
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"
    }
}, { timestamps: true })
const Internship = mongoose.model("Internship", internshipSchema)
module.exports = Internship