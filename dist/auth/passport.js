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
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_1 = __importDefault(require("passport"));
const userModel_1 = __importDefault(require("../models/userModel"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const clientId = process.env.GOOGLE_CLIENT_ID || "id";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "secret";
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "/google/callback"
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user = null;
    try {
        user = yield userModel_1.default.findOne({ googleId: profile.id });
    }
    catch (error) {
        console.log("Error find user", error);
    }
    if (!user) {
        // register
        user = {
            username: profile.displayName,
            googleId: profile.id,
            photo: profile.photos && profile.photos[0].value,
            email: profile.emails && profile.emails[0].value
        };
        try {
            const userDB = yield userModel_1.default.create(user);
            return done(null, userDB);
        }
        catch (error) {
            console.log("Error create user", error);
            return done(error, undefined);
        }
    }
    else {
        // login
        return done(null, user);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user = null;
    try {
        user = yield userModel_1.default.findOne({ _id: id });
    }
    catch (error) {
        console.log("Error find user", error);
        done(error, undefined);
    }
    done(null, user);
}));
