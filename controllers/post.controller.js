const { Post, User} = require("../models")

const newPost = async(req, res)=> {
    try{
        const {title, content, userId} = req.body
    
        const newPost = await Post.create({
            title,
            content,
            userId
        })
        return res.status(201).json({
            message:"Post successfully created", data:newPost
        })

    }catch(error) {
       return res.status(500).json({message:error.message})
    }
}


const getALLPost = async (req, res)=>{
    try{
        const post = await Post.findAll({
            include:[{
                model: User,
                as:"userpost",
                attributes:["firstName", "lastName"]
            }]
        })
        return res.status(200).json({data:post})

    }catch(error){
       return res.status(500).json({message:error.message})
    }
}


const getOnePost = async(req, res)=>{
    const { id } = req.params
    const post = await Post.findAll({where : { id }})

    if (!post) {
        return res.status(404).json({message:"Post not found"})
    }

    return res.status(200).json({data: post})
}

const getPostbyPk = async(req, res)=> {
    try{
        const { id } = req.params
        const post = await Post.findByPk(id,{ 
            include:[{
                    model: User,
                    as:"userpost",
                    attributes:["firstName", "lastName"]
                }]
        })

        if (!post) {
            return res.status(404).json({message:"Post not found"})
        }

        return res.status(200).json({message: "Post Found", data:post})

    }catch(error){
       return res.status(500).json({
            message: error.message
        })

    }

}

const updatedPost = async (req, res) => {
    try {
        const {id} = req.params;
        const { title, content }  = req.body
        const updatedPost = await Post.update({title, content }, {where: { id }});
        return res.status(200).json({
            message: 'Post updated successfully',
            data: updatedPost

        })
    }
    catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try{
        const { id } = req.params
        const post = await Post.findAll({where : { id }})

        if (!post){
           return res.status(404).json({message: "Post not found"})
        }

        await Post.destroy({where : { id }})
        return res.status(200).json({message : "Post successfully deleted"}) 
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    newPost,
    getALLPost,
    getOnePost,
    getPostbyPk,
    updatedPost,
    deletePost
}