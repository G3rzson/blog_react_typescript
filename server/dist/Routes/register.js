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
exports.createUser = void 0;
const registerUserSchema_1 = __importDefault(require("../DB/registerUserSchema"));
const registerSchema_1 = require("../Validation/registerSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = registerSchema_1.registerSchema.parse(req.body);
        const { username, email, password } = validateData;
        const existingUsername = yield registerUserSchema_1.default.findOne({ username });
        if (existingUsername) {
            res.status(400).json({ error: "Felhasználónév már foglalt!" });
            return;
        }
        const existingEmail = yield registerUserSchema_1.default.findOne({ email });
        if (existingEmail) {
            res.status(400).json({ error: "Email már foglalt!" });
            return;
        }
        const hashed = yield bcrypt_1.default.hash(password, 10);
        const newUser = new registerUserSchema_1.default({
            username,
            email,
            password: hashed,
        });
        yield newUser.save();
        res.status(201).json({ message: "Sikeres regisztráció!" });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({ error: err.errors });
            return;
        }
        res.status(500).json({ error: "Hiba történt a regisztráció során." });
    }
});
exports.createUser = createUser;
