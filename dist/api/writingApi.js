"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writingRouter = void 0;
const express_1 = __importDefault(require("express"));
const writingController_1 = require("../controllers/writingController");
exports.writingRouter = express_1.default.Router();
// get all writing list
exports.writingRouter.get("/", writingController_1.getAllWritingList);
// get writing list by user id
exports.writingRouter.get("/:userID", writingController_1.getWritingListByUserID);
// add new writing 
exports.writingRouter.post("/", writingController_1.addNewWriting);
// update writing by id
exports.writingRouter.put("/", writingController_1.updateWritingByID);
// delete writing by id
exports.writingRouter.delete("/:id", writingController_1.deleteWritingByID);
