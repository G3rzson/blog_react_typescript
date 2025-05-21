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
exports.connectToDB = connectToDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Környezeti változók betöltése
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL;
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!MONGO_URL) {
            return;
        }
        try {
            yield mongoose_1.default.connect(MONGO_URL).then(() => {
                console.log("Kapcsolódás sikeres");
            });
        }
        catch (err) {
            console.error("Kapcsolódási hiba:", err);
        }
    });
}
