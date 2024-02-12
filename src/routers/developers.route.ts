import { Router } from "express";
import {
  createDeveloperController,
  deleteDeveloperController,
  readDeveloperController,
  registerAditionalInfosDeveloperController,
  updateDeveloperController,
} from "../controllers/developers.controller";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { verifyDeveloperId } from "../middlewares/verifyDeveloperId.middleware";

export const developersRoutes: Router = Router();

developersRoutes.post("/", verifyEmail, createDeveloperController);

developersRoutes.use("/:developerId", verifyDeveloperId);
developersRoutes.get("/:developerId", readDeveloperController);
developersRoutes.patch("/:developerId", verifyEmail, updateDeveloperController);
developersRoutes.delete("/:developerId", deleteDeveloperController);
developersRoutes.post(
  "/:developerId/infos",
  registerAditionalInfosDeveloperController
);
