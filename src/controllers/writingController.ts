import { Request, Response } from 'express';
import writingModel from '../models/writingModel';


// get all writing list
export const getAllWritingList = async (req: Request, res: Response) => {
    try{
        const writingData = await writingModel.find();
        res.status(200).json(writingData);
    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}

// get writing list by user id
export const getWritingListByUserID = async (req: Request, res: Response) => {
    try{
        const writingData = await writingModel.find({ userID: req.params.userID });
        res.status(200).json(writingData);

    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}

// add new writing
export const addNewWriting = async (req: Request, res: Response) => {
    try{
        const { title, content, userID  } = req.body;
        const writingData = await writingModel.create({ title, content, userID });
        res.status(200).json(writingData);
    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}

// update writing by id
export const updateWritingByID = async (req: Request, res: Response) => {
    try{
        const writingData = await writingModel.findOneAndUpdate({ _id: req.body.id }, { ...req.body });
        res.status(200).json(writingData);
    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}

// delete writing by id
export const deleteWritingByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const writingData = await writingModel.findOneAndDelete({ _id: id })
        if(!writingData){
            return res.status(404).json({error: 'Writing not found'})
        }
        res.status(200).json(writingData);
    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}