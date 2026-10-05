const multer = require('multer')
const path = require("path")
const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]
const upload = multer({
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (req, file, next) => {
            next(null, Date.now() + path.extname(file.originalname))
        }
    }),limit:{
        fileSize:5*1024*1024
    },

    fileFilter: (req, file, next) => {

        if (allowedTypes.includes(file.mimetype)) {
            next(null, true)
        } else {
            next(new Error("Only image, PDF, DOC and DOCX files are allowed"))
        }
    }
})
module.exports = upload;