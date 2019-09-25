const express = require('express')
const router = express.Router()

const { addUser, getAllUser, deleteUser } = require("../controllers/user")

router.get("/", getAllUser)
router.post("/", addUser)
router.delete("/", deleteUser)

module.exports = router