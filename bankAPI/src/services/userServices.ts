import { redisClient } from "../config/database.config";
import User from "../model/userSchema";
import { generateToken } from "../utils/tokensUtil";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import throwError from "../utils/throwError";
import { userSignInType, userType } from "../utils/validationSchema";

export const signUp = async (payload: userType) => {
  try {
    const hashed = await encryptPassword(payload.password);
    const user = await User.create({ ...payload, password: hashed });
    const { accessToken, refreshToken } = generateToken(user._id.toString());
    return { statusCode: 201, message: user, accessToken, refreshToken };
  } catch (error: any) {
    console.error("Error saving user: " + error.message);
    throw throwError(400, error.message);
  }
};

export const signIn = async (payload: userSignInType) => {
  try {
    const user = await User.findOne({ email: payload.email }).exec();
    if (user === null) {
      throw throwError(404, `no record of user with ${payload.email}`);
    } else {
      const match = await decryptPassword(payload.password, user.password);
      if (!match) {
        throw throwError(400, "Password is incorrect");
      }
      const { accessToken, refreshToken } = generateToken(user._id.toString());

      //Redis Cache
      const DEFAULT_EXPIRATION = 2592000;
      await redisClient.setEx(user._id.toString(), DEFAULT_EXPIRATION, refreshToken);

      return {
        statusCode: 200,
        message: { accessToken, refreshToken },
      };
    }
  } catch (error) {
    console.error(error);
    throw throwError(500, "Internal Server Error");
  }
};

export const users = async()=>{
  const users =  await User.find()
  return {
    statusCode: 200,
    message: users
  }
}