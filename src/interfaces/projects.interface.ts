import { QueryResult } from "pg";

export type Project = {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate?: Date;
  developerId?: number;
};

export type ProjectCreate = Omit<Project, "id">;
export type ProjectUpdate = Partial<Project>;

export type ProjectResult = QueryResult<Project>;
