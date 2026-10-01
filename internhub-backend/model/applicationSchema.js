import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    resume :{
        type:String,
        default:""
    },
    coverLetter:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum :[
            "pending",
            "shortlisted",
            "accepted",
            "rejected"
        ],
        default:"pending"
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    internship:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Internship",
        reuired:true
    }
},{timestamps:true})
const Application = mongoose.model("Application",applicationSchema)
module.exports = Application