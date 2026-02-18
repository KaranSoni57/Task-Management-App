import mongoose from "mongoose";
import process from "node:process";

/**
 * @type {mongoose}
 */
export let connectionInstance;

const connectDB = async () => {
  const url = process.env.MONGO_URI;

  if (url) {
    try {
      connectionInstance = await mongoose.connect(
        `${url}/${process.env.DB_NAME}`,
        {},
      );
      console.log("\n Mongoose connected" + connectionInstance.connection.host);
    } catch (error) {
      console.log("Failed to connect to database: ", error);
      process.exit(1);
    }
  } else {
    console.log("Could not find database URL");
    process.exit(1);
  }
};

export default connectDB;
