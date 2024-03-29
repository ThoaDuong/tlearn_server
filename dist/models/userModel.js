"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: "string",
        required: true
    },
    googleId: {
        type: "string",
        required: true
    },
    photo: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
