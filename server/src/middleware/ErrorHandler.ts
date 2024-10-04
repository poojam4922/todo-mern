import { error } from "console";
import { NextFunction, Request, Response } from "express";


export const ErrorHandler = (error:any, req: Request, res: Response, next: NextFunction) => {
    console.log(error.stack);
    res.status(500).json({
        message:"An error occurred"
    })

}