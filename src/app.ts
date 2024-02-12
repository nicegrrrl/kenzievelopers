import "express-async-errors";
import "dotenv/config";
import express, { Application } from "express";
import { handleErrors } from "./middlewares/handleError.middleware";
import { routes } from "./routers/index.route";

const app: Application = express();

app.use(express.json());

app.use("/", routes);

app.use(handleErrors);

export default app;
