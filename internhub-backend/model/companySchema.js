const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        default: ""
    },
    logoId: {
        type: String,
        default: ""
    },
    description: {
        type: String
    },
    website: {
        type: String,
        unique:true
    },
    location: {
        type: String
    },
    logo: {
        type: String
    },
    verify: {
        type: Boolean,
        default: false
    },
    internshipPosted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship"
    },
}, { timestamps: true })

const Company = mongoose.model("Company", companySchema)
module.exports = Company 