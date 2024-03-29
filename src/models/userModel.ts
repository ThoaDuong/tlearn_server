import { Schema, model } from "mongoose";

const userSchema = new Schema({
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

export default model('User', userSchema);