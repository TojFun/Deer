import { ResponseFunction } from "./../types.ts";
import statusCodes from "../data/httpStatusCodes.ts";

export const response: ResponseFunction = (body, init) => {
  const realBody = typeof body === "string" ? body : JSON.stringify(body);
  const status = init?.status ?? 200;
  const contentType =
    init?.headers?.get("Content-Type") ?? typeof body === "string"
      ? "text/plain"
      : "application/json";

  return new Response(realBody, {
    status: init?.status ?? 200,
    statusText: init?.statusText ?? statusCodes[status],
    headers: {
      "Content-Type": contentType,
      ...init?.headers,
    },
  });
};
