const express = require("express");
const verifyUser = require("../middleware/auth");
const { applyInternships, getMyApplications, getApplicationById, getInternshipApplications, updateApplicationStatus, deleteApplication } = require("../controller/applicationController");
const upload = require("../utils/multer");
const roleMiddleware = require("../middleware/roleMiddleware");

const route = express.Router()

route.post("/apply/:internshipId",verifyUser,roleMiddleware("student"),upload.single("resume"),applyInternships)
route.get("/my-applications",verifyUser,roleMiddleware("student"),getMyApplications)
route.get("/:id",verifyUser,getApplicationById)
route.get("/company-applications/:internshipId",verifyUser,getInternshipApplications)
route.put("/:id/status",verifyUser, updateApplicationStatus)
route.delete( "/:id",verifyUser,deleteApplication)


module.exports = route