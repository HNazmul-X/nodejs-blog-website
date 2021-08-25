const multer = require("multer")
const path = require("path")
const { randomStringMake } = require("../Utils/UtilFuntions")

// setup storage
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "public/upload")
    },
    filename:(req, file, cb) => {
        cb(null, `${file.fieldname}__${Date.now()}__${randomStringMake(30)}__${file.originalname}`)
    }
})

const uploadMiddleware = multer({
    storage,
    limits:{
        fileSize:1024 * 1024 * 5
    },
    fileFilter:(req, file, cb) => {


        const types = /png|jpg|jpeg|gif|webp|svg/
        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mimeType = types.test(file.mimetype)
        if(extName && mimeType){
            cb(null, true)
        }
        else{
            cb(new Error("only supported png, jpeg, jpg, gif, webp"))
        }
    }
})

module.exports = uploadMiddleware