import mongoose from "mongoose";
const connectDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGO_URL);

    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};



export default connectDB;
