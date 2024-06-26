import { Schema, model } from "mongoose";

const vocaSchema = new Schema({
    word: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
        default: null
    },
    groupID: {
        type: Schema.Types.ObjectId,
        required: false,
        default: null
    },
    userID: {
        type: Schema.Types.ObjectId,
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

export default model('Vocabulary', vocaSchema);