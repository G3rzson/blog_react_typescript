import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Környezeti változók betöltése
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// connect to MongoDB
import { connectToDB } from "./DB/ConnectToDB";
connectToDB();

// middleware for json, cors, cookies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // vagy ahol a frontend fut
    credentials: true, // ha küldesz cookie-t / auth header-t
  })
);

// routes import
import { registerUser } from "./Routes/register";
import { loginUser } from "./Routes/login";
import { tokenUpdate } from "./Routes/token";
import { logoutUser } from "./Routes/logout";
import { createBlog } from "./Routes/createBlog";
import { verifyToken } from "./middlewares/verifyToken";
import { getBlogs } from "./Routes/getBlogs";
import { getMyBlogs } from "./Routes/getMyBlogs";

// routes
app.post("/user/register", registerUser);
app.post("/user/login", loginUser);
app.post("/token", tokenUpdate);
app.post("/user/logout", logoutUser);
app.post("/blog/create", verifyToken, createBlog);
app.get("/blogs", getBlogs);
app.post("/my-blogs", verifyToken, getMyBlogs);

app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
