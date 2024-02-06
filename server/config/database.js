const mongoose = require("mongoose");
require("dotenv").config();

const databaseToServerConnection = async (req, res) => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database To Server Connection Successfull");
    })
    .catch((error) => {
      console.log("Database Connection fail");
      console.error(error);
      process.exit(1);
    });
};

module.exports = databaseToServerConnection;
