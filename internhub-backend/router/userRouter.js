const express = require("express");
const { createUser, getUser, getUserById, userLogin, deleteUser, updateUser, resetPassword, forgotPassword } = require("../controller/userController");
const verifyUser = require("../middleware/auth");

const route = express.Router()

route.get("/",getUser)
route.post("/register",createUser)
route.post("/login",userLogin)

route.post("/reset-password/:resetToken", resetPassword)
route.post("/forgot-password", forgotPassword)

route.get("/:id",getUserById)
route.delete("/:id",verifyUser, deleteUser)
route.patch("/:id",verifyUser,updateUser)


module.exports = route