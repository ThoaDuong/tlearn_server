import express from 'express';
import { addNewVocabulary, deleteVocabulary, getAllVocabularies, getVocabularyByUserID, updateVocabulary } from '../controllers/vocaController';

export const vocaRouter = express.Router();

// get all vocabularies
vocaRouter.get("/", getAllVocabularies);

// get vocabulary by id
vocaRouter.get("/:userID", getVocabularyByUserID);

// add new vocabulary
vocaRouter.post("/", addNewVocabulary);

// delete vocabulary
vocaRouter.delete("/:id", deleteVocabulary);

// update vocabulary
vocaRouter.patch("/", updateVocabulary);