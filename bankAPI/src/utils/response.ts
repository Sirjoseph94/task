import { Response } from "express"

export const response = (res:Response, statusCode: number, data:any)=>{
  res.status(statusCode).json({
    status: statusCode > 399 ? "failed":"successful",
    data
  })
}
