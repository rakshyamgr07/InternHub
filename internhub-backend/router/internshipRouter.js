const express = require("express");
const verifyUser = require("../middleware/auth");
const { getInternships, postInternship, getInternshipById, deleteInternship, updateInternship } = require("../controller/internshipController");
const roleMiddleware = require("../middleware/roleMiddleware");

const route = express.Router()

route.get("/",getInternships)
route.post("/post",verifyUser,roleMiddleware("company"),postInternship)

route.get("/:id",getInternshipById)
route.delete("/:id",verifyUser,roleMiddleware("company"), deleteInternship)
route.patch("/:id",verifyUser,roleMiddleware("company"),updateInternship)

module.exports = route