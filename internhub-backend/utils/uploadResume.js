const cloudinary = require('cloudinary').v2;

async function uploadResume(resumePath){

    try {
           const result = await cloudinary.uploader.upload(resumePath)
           return result
    } catch (error) {
        console.log("Error upload resume",error)
    }
}

async function deleteResume(resumePath){

    try {
           const result = await cloudinary.uploader.destroy(resumePath)
           return result
    } catch (error) {
        console.log("Error deleting resume",error)
    }
}
module.exports = {uploadResume,deleteResume}