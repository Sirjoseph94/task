import { Request, Response } from "express";
import * as Service from "../services/userServices"
import { response } from "../utils/response";

export const signUp = async (req: Request, res: Response) => {
  const payload = req.body
  try{
    const data = await Service.signUp(payload)
    return response(res, data.statusCode, data.message)
  }catch(error:any){
   return response(res, error.statusCode, error.message);
  }
};

export const signIn = async (req:Request, res: Response) => {
const payload = req.body
  try {
    const data = await Service.signIn(payload)
    return response(res, data.statusCode, data.message)
  }catch(error:any){
   return response(res, error.statusCode, error.message);
  }
};

export const users = async (req: Request, res: Response) => {
  try {
    const data = await Service.users();
    return response(res, data.statusCode, data.message);
  } catch (error: any) {
    return response(res, error.statusCode, error.message);
  }
};