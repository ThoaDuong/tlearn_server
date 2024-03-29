"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocaRouter = void 0;
const express_1 = __importDefault(require("express"));
const vocaController_1 = require("../controllers/vocaController");
exports.vocaRouter = express_1.default.Router();
// get all vocabularies
exports.vocaRouter.get("/", vocaController_1.getAllVocabularies);
// get vocabulary by id
exports.vocaRouter.get("/:userID", vocaController_1.getVocabularyByUserID);
// add new vocabulary
exports.vocaRouter.post("/", vocaController_1.addNewVocabulary);
// delete vocabulary
exports.vocaRouter.delete("/:id", vocaController_1.deleteVocabulary);
// update vocabulary
exports.vocaRouter.patch("/", vocaController_1.updateVocabulary);
