import { type z } from "zod";

export type Body = {
  token?: string;
  [key: string]: string | number | undefined;
};

export type FetchProperties<T> = {
  url: string;
  body?: Body;
  method: "GET" | "POST";
  schema: z.ZodType<T>;
};
