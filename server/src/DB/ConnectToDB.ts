import mongoose from "mongoose";
import dotenv from "dotenv";

// Környezeti változók betöltése
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export async function connectToDB() {
  if (!MONGO_URL) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URL).then(()=> {
      console.log("Kapcsolódás sikeres");
    });
  } catch (err) {
    console.error("Kapcsolódási hiba:", err);
  }
}
