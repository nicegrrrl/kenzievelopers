import { Request, Response } from "express";
import {
  Developer,
  DeveloperAditionalInfosResponse,
  DeveloperUpdate,
} from "../interfaces/developers.interface";
import {
  createDeveloperService,
  deleteDeveloperService,
  readDeveloperService,
  registerAditionalInfosDeveloperService,
  updateDeveloperService,
} from "../services/developers.service";

export const createDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: Developer = await createDeveloperService(req.body);

  return res.status(201).json(developer);
};

export const readDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: Developer = await readDeveloperService(
    req.params.developerId
  );

  return res.status(200).json(developer);
};

export const updateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: DeveloperUpdate = await updateDeveloperService(
    req.params.developerId,
    req.body
  );

  return res.status(200).json(developer);
};

export const deleteDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteDeveloperService(req.params.developerId);

  return res.status(204).json();
};

export const registerAditionalInfosDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerInfos: DeveloperAditionalInfosResponse =
    await registerAditionalInfosDeveloperService(
      req.params.developerId,
      req.body
    );

  console.log(developerInfos);

  return res.status(201).json(developerInfos);
};
