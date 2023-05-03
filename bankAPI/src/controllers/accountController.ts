import {Request, Response} from "express";
import * as Services from "../services/accountServices"
import { response } from "../utils/response";
import { userRequest } from "../interface/express";
import { transferType } from "../utils/validationSchema";

export const transfer = async(req: userRequest, res: Response)=>{
  const {userId} = req.user
  const {amount, accountNumber}: transferType = req.body
  try {
    const data = await Services.transfer(amount, accountNumber, userId);
    return response(res, data.statusCode, data.message )
  } catch (error:any) {
    console.error(error)
    return response(res, error.statusCode, error.message);
  }
}