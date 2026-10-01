import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        trim:true
    },
    logo:{
        type:String,
        default:""
    },
    description:{
        type:String,
    },
    website:{
        type:String
    },
    isVerified:{
        type:Boolean
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
}
},{timestamps:true})
const Company = mongoose.model("Company",companySchema)
module.exports= Company