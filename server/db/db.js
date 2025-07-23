// import mongoose from "mongoose";

// const connectToDatabase = async()=>{
//     try{
//         await mongoose.connect(process.env.MONGODB_URL)
//     } catch(error){
//         console.log(error);
//     }
// }

// export default connectToDatabase

import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected:", conn.connection.name);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectToDatabase;
