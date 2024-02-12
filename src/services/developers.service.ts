import format from "pg-format";
import {
  Developer,
  DeveloperAditionalInfos,
  DeveloperAditionalInfosResponse,
  DeveloperAditionalInfosResult,
  DeveloperCreate,
  DeveloperResult,
  DeveloperUpdate,
} from "../interfaces/developers.interface";
import { client } from "../database";
import AppError from "../errors/App.error";
import { pgErrorCodes } from "../constants/pgErrorCodes";

export const createDeveloperService = async (
  data: DeveloperCreate
): Promise<Developer> => {
  const queryFormat: string = format(
    `INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: DeveloperResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const readDeveloperService = async (
  developerId: string
): Promise<Developer> => {
  const query: string = `
    SELECT
      "d"."id" AS "developerId",
      "d"."name" AS "developerName",
      "d"."email" AS "developerEmail",
      "di"."developerSince" AS "developerInfoDeveloperSince",
      "di"."preferredOS" AS "developerInfoPreferredOS"
    FROM "developers" AS "d"
    LEFT JOIN "developerInfos" AS "di"
      ON "di"."developerId" = "d"."id"
    WHERE "d"."id" = $1;
  `;

  const queryResult: DeveloperResult = await client.query(query, [developerId]);

  return queryResult.rows[0];
};

export const updateDeveloperService = async (
  developerId: string,
  data: DeveloperUpdate
): Promise<Developer> => {
  const queryFormat: string = format(
    `UPDATE "developers" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: DeveloperResult = await client.query(queryFormat, [
    developerId,
  ]);

  return queryResult.rows[0];
};

export const deleteDeveloperService = async (
  developerId: string
): Promise<void> => {
  const query: string = `DELETE FROM "developers" WHERE "id" = $1;`;

  await client.query(query, [developerId]);
};

export const registerAditionalInfosDeveloperService = async (
  developerId: string,
  data: DeveloperAditionalInfos
): Promise<DeveloperAditionalInfosResponse> => {
  const newData = {
    ...data,
    developerId,
  };

  const osList = ["Windows", "Linux", "MacOS"];

  const foundOs = osList.includes(data.preferredOS);

  if (!foundOs) {
    throw new AppError("Invalid OS option.", 400);
  }

  const query: string = format(
    `
    INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(newData),
    Object.values(newData)
  );

  try {
    const queryResult: DeveloperAditionalInfosResult = await client.query(
      query
    );

    return queryResult.rows[0];
  } catch (error: any) {
    if (pgErrorCodes[error.code] === "unique_violation") {
      throw new AppError("Developer infos already exists.", 409);
    }
    throw new AppError("Internal server error", 500);
  }
};
