import express from 'express'
import { addNewWriting, deleteWritingByID, getAllWritingList, getWritingListByUserID, updateWritingByID } from '../controllers/writingController';

export const writingRouter = express.Router();

// get all writing list
writingRouter.get("/", getAllWritingList);

// get writing list by user id
writingRouter.get("/:userID", getWritingListByUserID);

// add new writing 
writingRouter.post("/", addNewWriting);

// update writing by id
writingRouter.put("/", updateWritingByID);

// delete writing by id
writingRouter.delete("/:id", deleteWritingByID);