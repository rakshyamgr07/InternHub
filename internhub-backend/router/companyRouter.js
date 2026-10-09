const express = require("express");
const verifyUser = require("../middleware/auth");
const { createCompany, getCompany, getCompanyById, deleteCompany, updateCompany, getCompanyInternships } = require("../controller/companyController");
const upload = require("../utils/multer");
const roleMiddleware = require("../middleware/roleMiddleware");

const route = express.Router()

route.get("/",getCompany)
route.post("/create",verifyUser,roleMiddleware("company"),upload.single("logo"),createCompany)

route.get("/:id",getCompanyById)
route.delete("/:id",verifyUser,roleMiddleware("company"), deleteCompany)
route.patch("/:id",verifyUser,roleMiddleware("company"),updateCompany)

module.exports = route