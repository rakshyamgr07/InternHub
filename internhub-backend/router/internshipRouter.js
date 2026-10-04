const express = require("express");
const verifyUser = require("../middleware/auth");
const { getInternships, postInternship, getInternshipById, deleteInternship, updateInternship } = require("../controller/internshipController");

const route = express.Router()

route.get("/",getInternships)
route.post("/post",verifyUser,postInternship)

route.get("/:id",getInternshipById)
route.delete("/:id",verifyUser, deleteInternship)
route.patch("/:id",verifyUser,updateInternship)

module.exports = route