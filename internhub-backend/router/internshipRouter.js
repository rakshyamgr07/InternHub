const express = require("express");
const verifyUser = require("../middleware/auth");
const { getInternships, postInternship, getInternshipById, deleteInternship, updateInternship, searchInternships, getCompanyInternships } = require("../controller/internshipController");
const roleMiddleware = require("../middleware/roleMiddleware");

const route = express.Router()

route.get("/",getInternships)
route.get("/search-internship",searchInternships)
route.get("/company/:companyId/internships",getCompanyInternships)

route.get("/:id",getInternshipById)
route.post("/post",verifyUser,roleMiddleware("company"),postInternship)

route.delete("/:id",verifyUser,roleMiddleware("company"), deleteInternship)
route.patch("/:id",verifyUser,roleMiddleware("company"),updateInternship)

module.exports = route