const express = require("express");
const verifyUser = require("../middleware/auth");
const { createCompany, getCompany, getCompanyById, deleteCompany, updateCompany } = require("../controller/companyController");

const route = express.Router()

route.get("/",getCompany)
route.post("/create",verifyUser,createCompany)

route.get("/:id",getCompanyById)
route.delete("/:id",verifyUser, deleteCompany)
route.patch("/:id",verifyUser,updateCompany)

module.exports = route