import { NextFunction, Request, Response } from "express"
import { errorTypeToStatusCode } from "../utils/errorUtils";

export function errorHandlerMiddleware(
    err: Error | any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(err);
    if (err.type) {
      return res.sendStatus(errorTypeToStatusCode(err.type));
    }
  
    return res.sendStatus(500);
  }