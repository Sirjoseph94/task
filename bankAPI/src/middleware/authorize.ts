import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import options from "../config/config";
import { userRequest } from "../interface/express";
import User from "../model/userSchema";
import { redisClient } from "../config/database.config";
import { generateToken, verifyRefreshToken } from "../utils/tokensUtil";

async function authMiddleware(
  req: userRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let decoded;
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }
// attempt verifying accessToken
  try {
    decoded = jwt.verify(token, options.jwt.access_token.SECRET as string);
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ status: "Unauthorized" });
    }
    if (error.message === "jwt expired") {
      // call refreshToken function
      // decoded = verifyRefreshToken()

      // generate fresh token h
    }
    return res
      .status(401)
      .json({ status: "Unauthorized", message: error.message });
  }


  const { userId } = decoded as { [key: string]: string };
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }
  req.user = decoded;
  next();
}

export default authMiddleware;
