import { Schema, model } from "mongoose";

const writingSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

export default model('Writing', writingSchema)