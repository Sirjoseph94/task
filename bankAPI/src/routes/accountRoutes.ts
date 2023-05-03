import { Router } from "express";
import * as Controller from "../controllers/accountController";
import authMiddleware from "../middleware/authorize";
import isAdmin from "../middleware/isAdmin";
import { transferSchema } from "../utils/validationSchema";
import validate from "../middleware/validate";

const route = Router();

// route.post("/create", Controller.createAccount);
route.post("/transfer", validate(transferSchema), authMiddleware ,Controller.transfer);
// route.get("/txRecords", authMiddleware, isAdmin, Controller.signIn);

export default route;
