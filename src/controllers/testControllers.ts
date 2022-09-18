import * as testServices from "../services/testServices";
import { Request, Response } from "express";

export async function registerTest(req: Request, res: Response){
    const test = req.body;
    
    await testServices.registerTest(test)
    return res.sendStatus(201);    
}

export async function getTestsByDiscipline(req: Request, res: Response) {
    const testList = await testServices.getTestsByDiscipline()
    return res.status(200).send(testList)
}