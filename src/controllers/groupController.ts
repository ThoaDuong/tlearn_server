import groupModel from "../models/groupModel"
import { Request, Response } from 'express';

export const getAllGroups = async (req: Request, res: Response) => {
    try{
        const groupData = await groupModel.find();
        res.status(200).json(groupData);
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}

export const getGroupsByUserID = async (req: Request, res: Response) => {
    try{
        const groupData = await groupModel.find({ userID: req.params.userID });
        res.status(200).json(groupData);
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}

export const addNewGroup = async (req: Request, res: Response) => {
    try{
        const { groupName, userID } = req.body;
        const groupData = await groupModel.create({ groupName, userID });
        res.status(200).json(groupData);
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}

export const updateGroupByID = async (req: Request, res: Response) => {
    try {
        const { groupID, groupName } = req.body;
        const groupData = await groupModel.findByIdAndUpdate(groupID, { groupName: groupName });
        res.status(200).json(groupData);
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}

export const deleteGroupByID = async (req: Request, res: Response) => {
    try{
        const groupData = await groupModel.findByIdAndDelete(req.params.id);
        res.status(200).json(groupData);
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}
