const express = require("express")
const sequelize = require("./database/database")
const UserRouter = require("./routers/users.router")
const PostRouter = require("./routers/post.router")
const app = express()
const PORT = 6000

app.use(express.json())

app.use(UserRouter)
app.use(PostRouter)

const connectToDb = async()=>{
    try{
        await sequelize.authenticate()
        console.log("Database successfully connected")
    }catch(error){
        console.log("Conection failed", error.message)
    }
}
connectToDb()

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

