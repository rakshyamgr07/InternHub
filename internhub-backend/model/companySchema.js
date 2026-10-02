const mongoose = require("mongoose");
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
    location:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean
    },
    creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
}
},{timestamps:true})
const Company = mongoose.model("Company",companySchema)
module.exports= Company