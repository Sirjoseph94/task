import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimiter from "./utils/rateLimiter"
import Routes from "./routes";
import swaggerUi from "swagger-ui-express"
import apiDoc from "./config/openapi3_0.json"
import config from "./config/config";
import {db} from "./config/database.config";

//initialize database connection
const conn = db();
console.log(conn)

const PORT = config.server.PORT;
const app = express();

// monitor app on the "/status" route
// app.use(statusMonitor());
app.use(cors());
app.use(helmet());
app.use(rateLimiter)
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res)=>{
  res.send('<h1>This is BANKAPI</h1><p>Congratulations, API is live</p> <a href="/apidoc">Click here</a> to view the API endpoints')
})

Routes(app);

app.use("/apidoc", swaggerUi.serve, swaggerUi.setup(apiDoc) )


app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} 🚀`);
});
