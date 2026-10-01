const  User  = require("../model/userSchema")
const errorHandler = require("../utils/errorHandler")

async function createUser(req,res){
    try {
        const {name,email,password,role} = req.body
    if(!name || !email ||!password || !role){
        return res.status(400).json({
            success:false,
            message:"please insert all the fields"
        })    
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            success:true,
            message:"user with this email already exist"
        })
    }
    const newUser = await User.create({name , email, password, role})
    return res.status(200).json({
        success:true,
        messsage:"user created sucessfully",
        user: newUser
    })
    } catch (error) {
     return errorHandler(res,error)   
    }
}

async function getUser(req,res){
     try {
          const users = await User.find()
          return res.status(200).json({
               success: true,
               message: "User fetch successfully",
               users
          });
     } catch (error) {
          return handleError(res, error)
     }
}
module.exports = {createUser, getUser}