"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .nonempty("Felhasználónév megadása kötelező!")
        .trim()
        .max(15, "Maximum 15 karakter!"),
    password: zod_1.z
        .string()
        .max(25, "Maximum 25 karakter!"),
});
