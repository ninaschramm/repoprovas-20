import * as authServices from "../services/authServices";
import { Request, Response } from "express";
import dotenv from 'dotenv';
import { userData } from "../types/userTypes";

dotenv.config()

export async function createUser(req: Request, res: Response){
    const { email, password } = req.body;
    const user: userData = {
        email,
        password
    }
    await authServices.createUser(user);
    return res.sendStatus(201);    
}

export async function signIn(req: Request, res: Response) {
    const user: userData = req.body;
    const token = await authServices.login(user)
    return res.status(200).send({token});    
}