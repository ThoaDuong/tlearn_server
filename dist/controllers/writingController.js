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
exports.deleteWritingByID = exports.updateWritingByID = exports.addNewWriting = exports.getWritingListByUserID = exports.getAllWritingList = void 0;
const writingModel_1 = __importDefault(require("../models/writingModel"));
// get all writing list
const getAllWritingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const writingData = yield writingModel_1.default.find();
        res.status(200).json(writingData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllWritingList = getAllWritingList;
// get writing list by user id
const getWritingListByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const writingData = yield writingModel_1.default.find({ userID: req.params.userID });
        res.status(200).json(writingData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getWritingListByUserID = getWritingListByUserID;
// add new writing
const addNewWriting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, userID } = req.body;
        const writingData = yield writingModel_1.default.create({ title, content, userID });
        res.status(200).json(writingData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addNewWriting = addNewWriting;
// update writing by id
const updateWritingByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const writingData = yield writingModel_1.default.findOneAndUpdate({ _id: req.body.id }, Object.assign({}, req.body));
        res.status(200).json(writingData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateWritingByID = updateWritingByID;
// delete writing by id
const deleteWritingByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const writingData = yield writingModel_1.default.findOneAndDelete({ _id: id });
        if (!writingData) {
            return res.status(404).json({ error: 'Writing not found' });
        }
        res.status(200).json(writingData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteWritingByID = deleteWritingByID;
