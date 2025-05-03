"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const writingSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Writing', writingSchema);
