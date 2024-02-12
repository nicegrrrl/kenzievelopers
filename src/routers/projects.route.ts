import { Router } from "express";
import {
  createProjectController,
  readProjectController,
  updateProjectController,
} from "../controllers/projects.controller";
import { verifyProjectId } from "../middlewares/verifyProjectId.middleware";

export const projectsRoutes: Router = Router();

projectsRoutes.post("/", createProjectController);

projectsRoutes.use("/:id", verifyProjectId);
projectsRoutes.get("/:id", readProjectController);
projectsRoutes.patch("/:id", updateProjectController);
