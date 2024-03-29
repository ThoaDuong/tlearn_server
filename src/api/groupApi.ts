import express from 'express';
import { addNewGroup, deleteGroupByID, getAllGroups, getGroupsByUserID, updateGroupByID } from '../controllers/groupController';

export const groupRouter = express.Router();

groupRouter.get("/", getAllGroups);

groupRouter.get("/:userID", getGroupsByUserID);

groupRouter.post("/", addNewGroup);

groupRouter.delete("/:id", deleteGroupByID);

groupRouter.put("/", updateGroupByID);