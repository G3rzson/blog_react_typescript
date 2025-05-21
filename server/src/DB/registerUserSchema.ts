import mongoose from "mongoose";

type User = {
  userId?: string;
  username: string;
  email: string;
  password: string;
}

const newUserSchema = new mongoose.Schema<User>({
  userId: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const RegisterUserModel = mongoose.model("User", newUserSchema);

export default RegisterUserModel;