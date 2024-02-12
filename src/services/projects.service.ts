import format from "pg-format";
import { client } from "../database";
import {
  Project,
  ProjectCreate,
  ProjectResult,
  ProjectUpdate,
} from "../interfaces/projects.interface";
import AppError from "../errors/App.error";
import { pgErrorCodes } from "../constants/pgErrorCodes";

export const createProjectService = async (
  data: ProjectCreate
): Promise<Project> => {
  const queryFormat: string = format(
    `INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  try {
    const queryResult: ProjectResult = await client.query(queryFormat);

    return queryResult.rows[0];
  } catch (error: any) {
    if (pgErrorCodes[error.code] === "foreign_key_violation") {
      throw new AppError("Developer not found.", 404);
    }
    throw new AppError("Internal server error", 500);
  }
};

export const readProjectService = async (id: string): Promise<Project> => {
  const query: string = `
    SELECT
      "p"."id" AS "projectId",
      "p"."name" AS "projectName",
      "p"."description" AS "projectDescription",
      "p"."repository" AS "projectRepository",
      "p"."startDate" AS "projectStartDate",
      "p"."endDate" AS "projectEndDate",
      "d"."name" AS "projectDeveloperName"
    FROM "projects" AS "p"
    LEFT JOIN "developers" AS "d"
      ON "d"."id" = "p"."developerId"
    WHERE "p"."id" = $1;
  `;

  const queryResult: ProjectResult = await client.query(query, [id]);

  return queryResult.rows[0];
};

export const updateProjectService = async (
  id: string,
  data: ProjectUpdate
): Promise<Project> => {
  const queryFormat: string = format(
    `UPDATE "projects" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  try {
    const queryResult: ProjectResult = await client.query(queryFormat, [id]);

    return queryResult.rows[0];
  } catch (error: any) {
    if (pgErrorCodes[error.code] === "foreign_key_violation") {
      throw new AppError("Developer not found.", 404);
    }
    throw new AppError("Internal Server Error", 500);
  }
};
