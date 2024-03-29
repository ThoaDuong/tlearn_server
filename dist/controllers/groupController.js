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
exports.deleteGroupByID = exports.updateGroupByID = exports.addNewGroup = exports.getGroupsByUserID = exports.getAllGroups = void 0;
const groupModel_1 = __importDefault(require("../models/groupModel"));
const getAllGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupData = yield groupModel_1.default.find();
        res.status(200).json(groupData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getAllGroups = getAllGroups;
const getGroupsByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupData = yield groupModel_1.default.find({ userID: req.params.userID });
        res.status(200).json(groupData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getGroupsByUserID = getGroupsByUserID;
const addNewGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupName, userID } = req.body;
        const groupData = yield groupModel_1.default.create({ groupName, userID });
        res.status(200).json(groupData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.addNewGroup = addNewGroup;
const updateGroupByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupID, groupName } = req.body;
        const groupData = yield groupModel_1.default.findByIdAndUpdate(groupID, { groupName: groupName });
        res.status(200).json(groupData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateGroupByID = updateGroupByID;
const deleteGroupByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupData = yield groupModel_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json(groupData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.deleteGroupByID = deleteGroupByID;
