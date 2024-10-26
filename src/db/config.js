const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const { DB_NAME } = require("../constants");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(`✔️  mongodb connected`);
    console.log(`✔️  mongodb host ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("ERROR: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
