import { userRequest } from "../interface/express";
import { Response, NextFunction } from "express";
import User from "../model/userSchema";

async function isAdmin(req: userRequest, res: Response, next: NextFunction) {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (user && user.role !== "ADMIN") {
       return res.status(401).json({
         status: "unauthozied",
         message: "you are not authorized to perform this operation",
       });
      }
      
     next();
   
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
}

export default isAdmin