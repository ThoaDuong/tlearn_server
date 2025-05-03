"use strict";
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
exports.updateVocabulary = exports.deleteVocabulary = exports.addNewVocabulary = exports.getVocabularyByUserID = exports.getAllVocabularies = void 0;
const vocaModel_1 = __importDefault(require("../models/vocaModel"));
const mongodb_1 = require("mongodb");
//get all vocabularies
const getAllVocabularies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vocaData = yield vocaModel_1.default.find();
        res.status(200).json(vocaData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllVocabularies = getAllVocabularies;
//get vocabulary by id
const getVocabularyByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    try {
        const vocaData = yield vocaModel_1.default.aggregate([
            {
                $lookup: {
                    from: "groups", // collection name in db
                    localField: "groupID",
                    foreignField: "_id",
                    as: "groupData"
                }
            },
            {
                $match: { userID: new mongodb_1.ObjectId(userID) }
            }
        ]);
        res.status(200).json(vocaData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getVocabularyByUserID = getVocabularyByUserID;
// add new vocabulary
const addNewVocabulary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { word, type, meaning, example, userID, groupID } = req.body;
    try {
        const vocaData = yield vocaModel_1.default.create({ word, type, meaning, example, userID, groupID });
        res.status(200).json(vocaData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addNewVocabulary = addNewVocabulary;
// delete vocabulary
const deleteVocabulary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vocaData = yield vocaModel_1.default.findOneAndDelete({ _id: id });
        if (!vocaData) {
            return res.status(404).json({ error: 'Vocabulary not found' });
        }
        res.status(200).json(vocaData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteVocabulary = deleteVocabulary;
// update vocabulary
const updateVocabulary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vocaData = yield vocaModel_1.default.findOneAndUpdate({ _id: req.body.id }, Object.assign({}, req.body));
        if (!vocaData) {
            return res.status(404).json({ error: 'Vocabulary not found' });
        }
        res.status(200).json(vocaData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateVocabulary = updateVocabulary;
