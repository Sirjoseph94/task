import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const valid = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      if (!valid.success) throw valid.error;
      req.body = valid.data.body;
      return next();
    } catch (error) {
       if (error instanceof ZodError) {
         console.error(error.errors);
         return res.status(400).json({status: "Bad request", Errors: error.errors});
       } else {
         console.error(error);
         return res.status(500).json({ message: "Internal server error" });
       }
    }
  };



export default validate;
