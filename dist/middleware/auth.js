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
exports.authenticateUserSession = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUserSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' });
    const secret = process.env.SECRET || 'secret';
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded.email) {
            return res.status(403).json({ msg: 'Token is not valid' });
        }
        next();
    }
    catch (error) {
        return res.status(403).json({ msg: 'Token is not valid' });
    }
});
exports.authenticateUserSession = authenticateUserSession;
