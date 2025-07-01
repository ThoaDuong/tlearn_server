import express from 'express';
import {
    addNewVocabulary,
    deleteVocabulary,
    getAllVocabularies,
    getVocabulariesByPageAndGroup,
    getVocabularyByUserID,
    updateVocabulary
} from '../controllers/vocaController';

export const vocaRouter = express.Router();

// get all vocabularies
vocaRouter.get("/", getAllVocabularies);

// get vocabularies by page and group
vocaRouter.get("/page/:userID", getVocabulariesByPageAndGroup);

// get vocabulary by id
vocaRouter.get("/:userID", getVocabularyByUserID);

// add new vocabulary
vocaRouter.post("/", addNewVocabulary);

// delete vocabulary
vocaRouter.delete("/:id", deleteVocabulary);

// update vocabulary
vocaRouter.patch("/", updateVocabulary);