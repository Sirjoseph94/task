import { Router } from "express";
import * as Controller from "../controllers/userController";
import validate from "../middleware/validate";
import { userSchema, userSignIn } from "../utils/validationSchema";
import authMiddleware from "../middleware/authorize";
import isAdmin from "../middleware/isAdmin";

const route = Router();

route.post("/register", validate(userSchema), Controller.signUp);
route.post("/signin", validate(userSignIn), Controller.signIn);
route.get("/all", authMiddleware, isAdmin, Controller.users)

export default route;
