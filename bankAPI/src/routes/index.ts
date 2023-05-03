import { Router } from "express";
import authRoutes from "./userRoutes"
import accountRoute from "./accountRoutes"

const Routes = (app:Router)=>{
  app.use("/api/v1/user", authRoutes)
  app.use("/api/v1/account", accountRoute)
}

export default Routes