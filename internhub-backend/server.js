require('dotenv').config()
const express = require("express")
const connectDb = require("./config/DbConnect")
const userRouter = require('./router/userRouter');
const app =express()
const PORT = process.env.PORT || 4000
app.use(express.json())

app.use("/api/v1/user",userRouter)
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
    connectDb()
})