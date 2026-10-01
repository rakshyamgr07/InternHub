const express = require("express");
const { createUser, getUser, getUserById } = require("../controller/userController");

const route = express.Router()

route.get("/",getUser)
route.post("/register",createUser)


module.exports = route