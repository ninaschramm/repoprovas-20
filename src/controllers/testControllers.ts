import * as testServices from "../services/testServices";
import { Request, Response } from "express";

export async function registerTest(req: Request, res: Response){
    const test = req.body;
    
    await testServices.registerTest(test)
    return res.sendStatus(201);    
}