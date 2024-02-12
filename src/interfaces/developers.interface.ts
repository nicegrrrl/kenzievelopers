import { QueryResult } from "pg";

export type Developer = {
  id: number;
  name: string;
  email: string;
};

export type DeveloperCreate = Omit<Developer, "id">;
export type DeveloperUpdate = Partial<Developer>;

export type DeveloperResult = QueryResult<Developer>;

type OS = "Windows" | "Linux" | "MacOS";

export type DeveloperAditionalInfos = {
  developerSince: Date;
  preferredOS: OS;
};

export type DeveloperAditionalInfosResponse = {
  id: number;
  developerSince: Date;
  preferredOS: string;
  developerId: number;
};

export type DeveloperAditionalInfosResult =
  QueryResult<DeveloperAditionalInfosResponse>;
