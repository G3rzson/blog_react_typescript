import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import session from "express-session"

// Környezeti változók betöltése
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// connect to MongoDB
import { connectToDB } from "./DB/ConnectToDB"
connectToDB();

// middleware for json and cors 
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // vagy ahol a frontend fut
    credentials: true, // fontos a session működéséhez
  })
);

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,  // Tipizálás, hogy biztosan string lesz
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // fejlesztéshez: https esetén állítsd true-ra
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 óra
      sameSite: 'lax', // vagy 'none' ha https
    },
  })
);

// middlewares
import { isAuthenticated } from "./middlewares/isAuth";

// routes import
import {createUser} from "./Routes/register"
import { login } from "./Routes/login";
import { logout } from "./Routes/logout";
import { profile } from "./Routes/profile";
import { newBlogs } from "./Routes/newblogs";
import { getBlogs } from "./Routes/getBlogs";

// routes
app.get('/', getBlogs);
app.get('/profile', isAuthenticated, profile);
app.post('/register', createUser);
app.post('/login', login);
app.post('/logout', logout);
app.post('/newblog',isAuthenticated, newBlogs);

app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
