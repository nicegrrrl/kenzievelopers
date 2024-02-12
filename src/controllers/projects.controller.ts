import { Request, Response } from "express";
import { Project } from "../interfaces/projects.interface";
import {
  createProjectService,
  readProjectService,
  updateProjectService,
} from "../services/projects.service";

export const createProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: Project = await createProjectService(req.body);

  return res.status(201).json(project);
};

export const readProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: Project = await readProjectService(req.params.id);

  return res.status(200).json(project);
};

export const updateProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: Project = await updateProjectService(req.params.id, req.body);

  return res.status(200).json(project);
};
