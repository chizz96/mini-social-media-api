const { User, Post } = require("../models")


const newUser = async(req, res)=> {
    try{
        const {firstName, lastName, email } = req.body
        const user = await User.findOne({where : { email }}) 

        if (user){
            return res.status(400).json({message: "user already exist"})
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
        })
       return res.status(201).json({
            message:"Student successfully created", data:newUser
        })

    }catch(error) {
        return res.status(500).json({message:error.message})
    }
}


const getALLUser = async (req, res)=>{
    try{
        const user = await User.findAll({
            include: {
                model: Post,
                attributes: [ "title" ]
            }})
        return res.status(200).json({data:user})

    }catch(error){
       return res.status(500).json({message:error.message})
    }
}


const getOneUser = async(req, res)=>{
    const { id } = req.params
    const user = await User.findAll({where : { id }})

    if (!user) {
       return res.status(404).json({message:"user not found"})
    }

   return res.status(200).json({data: user})
}


const getUserbyPk = async(req, res)=> {
    try{
        const { id } = req.params
        const user = await User.findByPk(id,{ 
            include:{
                    model: Post,
                    attributes:["title"]
                }
        })

        if (!user) {
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({message: "user Found", data:user})

    }catch(error){
       return res.status(500).json({
            message: error.message
        })

    }

}

const updatedUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {lastName, email, firstName}  = req.body
        const updatedUser = await User.update({lastName, email, firstName}, { where: { id }});
        return res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser

        })
    }
    catch(error){
       return res.status(500).json({
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try{
        const { id } = req.params
        const user = await User.findAll({where : { id }})

        if (!user){
            return req.status(404).json({message: "user not found"})
        }

        await User.destroy({where : { id }})
        return res.status(200).json({message : "User successfully deleted"}) 
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    newUser,
    getALLUser,
    getOneUser,
    getUserbyPk,
    updatedUser,
    deleteUser
}