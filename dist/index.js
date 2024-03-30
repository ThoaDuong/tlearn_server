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
const dotenv = __importStar(require("dotenv"));
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
require("./auth/passport");
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const vocaApi_1 = require("./api/vocaApi");
const groupApi_1 = require("./api/groupApi");
const googleAuthApi_1 = require("./api/googleAuthApi");
dotenv.config();
const app = (0, express_1.default)();
//static variable
const port = process.env.PORT || 3000;
const cookieName = process.env.COOKIE_NAME || "name";
const cookieKey = process.env.COOKIE_KEY || "key";
const corsOptions = {
    // origin: [
    //     'https://tlearn-english.netlify.app',
    //     'http://tlearn-english.netlify.app',
    //     'https://tlearn-english.netlify.app/*',
    //     'http://tlearn-english.netlify.app/*',
    // ],
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};
//middleware
//cookie
app.use((0, cookie_session_1.default)({
    maxAge: 24 * 60 * 60 * 1000,
    name: cookieName,
    keys: [cookieKey],
}));
// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb();
        };
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb();
        };
    }
    next();
});
//passport | auth
app.use((0, cors_1.default)(corsOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, express_1.json)());
// api 
app.use('/', googleAuthApi_1.googleAuthRouter);
app.use('/group', groupApi_1.groupRouter);
app.use('/vocabulary', vocaApi_1.vocaRouter);
// connect to db
const mongo_uri = process.env.MONGO_URI || '';
mongoose_1.default.connect(mongo_uri)
    .then(() => {
    app.listen(port, () => {
        console.log('Listening port ', port);
    });
})
    .catch(error => console.log('Fail to connect DB', error));
