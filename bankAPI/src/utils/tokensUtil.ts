import jwt from "jsonwebtoken";
import options from "../config/config";
import throwError from "./throwError";
import { redisClient } from "../config/database.config";


export function generateToken(id: string) {
  if (!options.jwt.access_token || !options.jwt.refresh_token) {
    throw throwError(500, {
      Error: "Server misconfiguration",
      reason: "Setup your env",
    });
  }
  const ACCESS_TOKEN_SECRET = options.jwt.access_token.SECRET as unknown as string;
  const ACCESS_TOKEN_EXPIRE = options.jwt.access_token.EXPIRE as unknown as string
  const REFRESH_TOKEN_SECRET = options.jwt.refresh_token.SECRET as unknown as string;
  const REFRESH_TOKEN_EXPIRE = options.jwt.refresh_token.EXPIRE as unknown as string;

  const accessToken = jwt.sign({ userId: id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });
  const refreshToken = jwt.sign({ userId: id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  });

  return { accessToken, refreshToken };
}

export const verifyRefreshToken = async(userId:string)=>{
   try {
   
    return jwt.verify(userId,options.jwt.refresh_token.SECRET as string);
   } catch (error:any) {
     console.error(error);
     return ({ status: "Unauthorized", message: error.message });
   }
}

