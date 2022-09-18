import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { unauthorizedError } from '../utils/errorUtils'
dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        if (!authorization) throw unauthorizedError('Missing authorization header');

        const token = authorization?.replace("Bearer ", "");        
        if (!token) throw unauthorizedError('Missing token');

        const data: any = jwt.verify(token, process.env.TOKEN_SECRET);

        if (data) {
            res.locals.id = data.id;
            next();            
        } else {
            throw unauthorizedError('Impossible to authenticate user')
        }

    } catch (error) {
        return res.sendStatus(401);
    }
}