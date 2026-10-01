const express = require("express");
const { createUser, getUser, getUserById, userLogin, deleteUser, updateUser } = require("../controller/userController");
const verifyUser = require("../middleware/auth");

const route = express.Router()

route.get("/",getUser)
route.post("/register",createUser)
route.post("/login",userLogin)

route.get("/:id",getUserById)
route.delete("/:id",verifyUser, deleteUser)
route.patch("/:id",verifyUser,updateUser)


module.exports = route