const express = require("express");
const verifyUser = require("../middleware/auth");
const { applyInternships } = require("../controller/applicationController");

const route = express.Router()

route.post("/apply/:internshipId",applyInternships)
// route.get("/my-applications",verifyUser,getMyApplications)
// route.get("/:id",verifyUser,getApplicationById)
// route.get("/:internshipId",verifyUser,getInternshipApplications)
// route.put("/:id/status",verifyUser, updateApplicationStatus)
// route.delete( "/:id",verifyUser,deleteApplication)


module.exports = route