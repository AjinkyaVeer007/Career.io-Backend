import mongoose from "mongoose";
import { db_name } from "../utils/constant.js";

const dbConnection = async () => {
  try {
    const dbConnectionInstance = await mongoose.connect(
      process.env.MONGODB_URL + "job"
    );
    console.log(
      "db connected successfully",
      dbConnectionInstance.connection.host
    );
    return true;
  } catch (error) {
    console.log("Fail to conect db", error);
  }
};

export default dbConnection;
