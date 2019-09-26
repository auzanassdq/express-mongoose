const express = require('express')
const router = express.Router()

const { addUser, getAllUser, deleteUser, uploadImage } = require("../controllers/user")
const upload = require('../config/multer')

router.get("/", getAllUser)
router.post("/", upload.any(), addUser)
router.delete("/", deleteUser)
router.post("/user-image", upload.any(), uploadImage)

module.exports = router