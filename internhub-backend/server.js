require('dotenv').config()
const express = require("express")
const connectDb = require("./config/DbConnect")
const userRouter = require('./router/userRouter');
const companyRouter = require('./router/companyRouter');
const internshipRouter = require('./router/internshipRouter');
const applicationRouter = require('./router/applicationRouter');
const cloudinaryConfig = require('./config/cloudinary');


const app =express()
const PORT = process.env.PORT || 4000
app.use(express.json())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/company",companyRouter)
app.use("/api/v1/internship",internshipRouter)
app.use("/api/v1/application",applicationRouter)


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
    connectDb()
    cloudinaryConfig()
})