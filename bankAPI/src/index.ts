import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import Routes from "./routes";
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
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



Routes(app);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} 🚀`);
});
