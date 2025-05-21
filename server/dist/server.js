"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
// Környezeti változók betöltése
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
// connect to MongoDB
const ConnectToDB_1 = require("./DB/ConnectToDB");
(0, ConnectToDB_1.connectToDB)();
// middleware for json and cors 
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // vagy ahol a frontend fut
    credentials: true, // fontos a session működéséhez
}));
// session
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET, // Tipizálás, hogy biztosan string lesz
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // fejlesztéshez: https esetén állítsd true-ra
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 óra
        sameSite: 'lax', // vagy 'none' ha https
    },
}));
// routes import
const register_1 = require("./Routes/register");
const login_1 = require("./Routes/login");
// routes
app.post('/register', register_1.createUser);
app.post('/login', login_1.login);
app.listen(PORT, () => {
    console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
