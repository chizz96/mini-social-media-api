const express = require("express")
const { newPost, getALLPost, getOnePost,getPostbyPk, updatedPost, deletePost } = require("../controllers/post.controller")
const router = express.Router()


router.post("/createPost", newPost)
router.get("/getallPost", getALLPost)
router.get("/getonePost/:id", getOnePost)
router.get("/getPostbypk/:id",getPostbyPk,)
router.patch("/updatePost/:id", updatedPost)
router.delete("/deletePost/:id", deletePost)

module.exports = router





module.exports = router