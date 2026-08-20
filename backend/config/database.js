const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
})

sequelize.authenticate()
  .then(() => {
    console.log("Database connection successfull!");
  })
  .catch((error) => {
    console.error("Error Database connection: ", error);
  })

const Chat = require("../src/models/Chat")(sequelize, Sequelize.DataTypes);

sequelize.sync()
  .then(() => {
    console.log("Models synchronization successful!");
  })
  .catch((error) => {
    console.error("Error Models synchronization: ", error);
  })

module.exports = {
  sequelize, Chat
}
