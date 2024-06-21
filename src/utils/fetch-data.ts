import { FetchProperties } from "@/types/fetch-data";

const fetchData = async <T>({
  url,
  body,
  method,
  schema,
}: FetchProperties<T>): Promise<T> => {
  const response = await fetch(url, {
    method,
    ...(body ? { body: JSON.stringify(body) } : undefined),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers":
        "Origin,X-Requested-With,Content-Type,Accept",
    },
  });
  const validationResponse = schema.safeParse(await response.json());
  if (!validationResponse.success) {
    throw new Error(validationResponse.error.message);
  }
  return validationResponse.data;
};

export default fetchData;
