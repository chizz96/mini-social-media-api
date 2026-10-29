const express = require("express")

const { newUser, getALLUser, getOneUser,getUserbyPk, updatedUser, deleteUser,} = require("../controllers/user.controller")

const router = express.Router()
router.post("/createUser", newUser)
router.get("/getalluser", getALLUser)
router.get("/getoneuser/:id", getOneUser)
router.get("/getUserbypk/:id",getUserbyPk,)
router.patch("/updateUser/:id", updatedUser)
router.delete("/deleteUser/:id", deleteUser)

module.exports = router



