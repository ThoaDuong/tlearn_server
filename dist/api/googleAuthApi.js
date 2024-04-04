"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.googleAuthRouter = express_1.default.Router();
const clientUrl = process.env.CLIENT_URL || "";
// handle login success
exports.googleAuthRouter.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'Login successfully',
            user: req.user
        });
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Login failed'
        });
    }
});
// handle login failed
exports.googleAuthRouter.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'Login failed'
    });
});
// handle logout
exports.googleAuthRouter.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err)
            return next(err);
    });
    res.redirect(clientUrl);
});
// handle first click login
exports.googleAuthRouter.get('/google/login', passport_1.default.authenticate('google', { scope: ["profile", "email"] }));
// handle call back
exports.googleAuthRouter.get('/google/callback', passport_1.default.authenticate('google', {
    successRedirect: clientUrl,
    failureRedirect: "login/failed"
}));
