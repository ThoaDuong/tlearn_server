import { Schema, model } from "mongoose";

const groupSchema = new Schema({
    groupName: {
        type: "string",
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

export default model('Group', groupSchema);