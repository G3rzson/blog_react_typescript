import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("A MONGO_URI nincs beállítva.");
}

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("MongoDB kapcsolódás sikeres");
  } catch (err) {
    console.error("MongoDB kapcsolódás sikertelen:", err);
    throw err;
  }
}
