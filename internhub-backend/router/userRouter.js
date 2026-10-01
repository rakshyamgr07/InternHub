const express = require("express");
const { createUser, getUser, getUserById, getUserById } = require("../controller/userController");

const route = express.Router()

route.get("/",getUser)
route.post("/register",createUser)
route.get("/:id",getUserById)


module.exports = route