const { Sequelize } = require("sequelize")

// conecting to the social mini application database
const sequelize = new Sequelize("SocialMiniDb", "root", "root", {
    host: "localhost",
    dialect: "mysql"
})


module.exports = sequelize