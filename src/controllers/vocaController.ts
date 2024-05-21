import { Request, Response } from 'express';
import vocaModel from '../models/vocaModel'
import { ObjectId } from 'mongodb';

//get all vocabularies
export const getAllVocabularies = async (req: Request, res: Response) => {
    try{
        const vocaData = await vocaModel.find();
        res.status(200).json(vocaData);
    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}

//get vocabulary by id
export const getVocabularyByUserID = async (req: Request, res: Response) => {
    const { userID } = req.params;
    try{
        const vocaData = await vocaModel.aggregate([
            {
                $lookup: {
                    from: "groups", // collection name in db
                    localField: "groupID",
                    foreignField: "_id",
                    as: "groupData"
                }
            },
            {
                $match: {userID: new ObjectId(userID)} 
            }
        ])
        
        res.status(200).json(vocaData);
    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}


// add new vocabulary
export const addNewVocabulary = async (req: Request, res: Response) => {
    const { word, type, meaning, example, userID, groupID } = req.body;
    try{
        const vocaData = await vocaModel.create({ word, type, meaning, example, userID, groupID } );
        res.status(200).json(vocaData);
        
    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}

// delete vocabulary
export const deleteVocabulary = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const vocaData = await vocaModel.findOneAndDelete({ _id: id })
        if(!vocaData){
            return res.status(404).json({error: 'Vocabulary not found'})
        }
        res.status(200).json(vocaData);
    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}

// update vocabulary
export const updateVocabulary = async (req: Request, res: Response) => {
    try{
        const vocaData = await vocaModel.findOneAndUpdate({ _id: req.body.id }, { ...req.body });
        if(!vocaData){
            return res.status(404).json({error: 'Vocabulary not found'})
        }
        res.status(200).json(vocaData);
    }catch(error: any){
        res.status(400).json({error: error.message});
    }
}