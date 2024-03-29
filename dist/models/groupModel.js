"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    groupName: {
        type: "string",
        required: true
    },
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Group', groupSchema);
