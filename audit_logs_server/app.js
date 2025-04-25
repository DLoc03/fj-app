import express, { urlencoded } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { AUDIT_ROUTE_API } from "./src/routes/index.js";
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/log/api", AUDIT_ROUTE_API);
export { app };
