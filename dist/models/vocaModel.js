"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const vocaSchema = new mongoose_1.Schema({
    word: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    groupID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
    },
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    meaning: {
        type: String,
        required: true,
    },
    example: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Vocabulary', vocaSchema);
