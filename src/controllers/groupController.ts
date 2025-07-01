import groupModel from "../models/groupModel"
import { Request, Response } from 'express';
import vocaModel from "../models/vocaModel";
import {ObjectId} from "mongodb";

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
        // filter list groups based on userID
        const groupData = await groupModel.find({ userID: req.params.userID }).sort({ createdAt: -1 });
        const result = await Promise.all(
            // count total Voca for each group
            groupData.map(async (group) => {
                const totalVoca = await vocaModel.countDocuments({
                    userID: new ObjectId(req.params.userID),
                    groupID: new ObjectId(group._id),
                });
                return {
                    group,
                    totalVoca
                };
            })
        )
        res.status(200).json(result);

        // Advanced of filter list groups based on UserID and count total voca for each group
        // const { userID } = req.params;
        // const groupData = await groupModel.aggregate([
        //     { $match: { userID } },
        //     {
        //         $lookup: {
        //             from: "vocas",
        //             let: { groupId: "$_id" },
        //             pipeline: [
        //                 { $match: { $expr: { $and: [ { $eq: ["$userID", userID] }, { $eq: ["$groupID", "$$groupId"] } ] } } },
        //                 { $count: "count" }
        //             ],
        //             as: "vocaCount"
        //         }
        //     },
        //     {
        //         $addFields: {
        //             totalVoca: { $ifNull: [ { $arrayElemAt: [ "$vocaCount.count", 0 ] }, 0 ] }
        //         }
        //     },
        //     { $project: { vocaCount: 0 } }
        // ])
        // res.status(200).json(groupData);

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
