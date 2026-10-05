const express = require("express");
const verifyUser = require("../middleware/auth");
const route = express.Router()
const roleMiddleware = require("../middleware/roleMiddleware");
const { getAllUsers, deleteUser, getAllCompanies, verifyCompany, getAllInternships, deleteCompany, deleteInternships, getDashBoardStatus, getAllApplications } = require("../controller/adminController");

route.get("/users",verifyUser,roleMiddleware("admin"),getAllUsers)
route.delete("/users/:id",verifyUser,roleMiddleware("admin"),deleteUser)

route.get("/companies",verifyUser,roleMiddleware("admin"),getAllCompanies)
route.put("/companies/:id/verify",verifyUser,roleMiddleware("admin"),verifyCompany)
route.delete("/companies/:id",verifyUser,roleMiddleware("admin"),deleteCompany)

route.get("/internships",verifyUser,roleMiddleware("admin"),getAllInternships)
route.delete("/internships/:id",verifyUser,roleMiddleware("admin"),deleteInternships)

route.get("/applications",verifyUser,roleMiddleware("admin"),getAllApplications)

route.get("/dashboard",verifyUser,roleMiddleware("admin"),getDashBoardStatus)



module.exports = route
