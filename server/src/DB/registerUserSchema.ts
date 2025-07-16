import { Schema, model, models } from "mongoose";
import { RegisterFormData } from "../Validation/registerSchema";

// Schema
const registerUserSchema = new Schema<RegisterFormData>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["author", "admin"] },
});
// Model
const RegisterUserModel =
  models.User || model<RegisterFormData>("User", registerUserSchema);

export default RegisterUserModel;
