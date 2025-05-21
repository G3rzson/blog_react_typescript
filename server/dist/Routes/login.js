"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const loginSchema_1 = require("../Validation/loginSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUserSchema_1 = __importDefault(require("../DB/registerUserSchema"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = loginSchema_1.loginSchema.safeParse(req.body);
        if (!user.success) {
            res.status(400).json({
                message: "Hibás adatok",
                errors: user.error.format(),
            });
            return;
        }
        const { username, password } = user.data;
        try {
            const existingUser = yield registerUserSchema_1.default.findOne({ username });
            if (!existingUser) {
                res.status(400).json({ error: "Felhasználó nem található!" });
                return;
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
            if (!isPasswordValid) {
                res.status(401).json({ error: "Hibás jelszó!" });
                return;
            }
            req.session.user = {
                id: existingUser._id.toString(),
                username: existingUser.username,
                email: existingUser.email,
            };
            // ki van bejelentkezve?
            console.log(req.session.user.username);
            res.status(200).json({
                message: "Sikeres bejelentkezés",
                user: req.session.user,
            });
            return;
        }
        catch (error) {
            console.error("Hiba a beléptetés során:", error);
            res
                .status(500)
                .json({ error: "Valami hiba történt a bejelentkezés közben" });
            return;
        }
    });
}
