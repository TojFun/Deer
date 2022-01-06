import { DeerRequest } from "./classes/DeerRequest.ts";
import { TemplatePath } from "./classes/Path.ts";

export interface Handle {
  path: TemplatePath;
  method: HTTPMethod;
  handler: Handler;
}

export interface Param {
  param: string;
  index: number;
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

export type Handler = (
  req: DeerRequest,
  res: ResponseFunction
) => Response | Promise<Response>;

type ResponseBody = string | Record<string, unknown>;

interface ResponseInit {
  headers?: Headers;
  status?: number;
  statusText?: string;
}

export type ResponseFunction = (
  body: ResponseBody,
  init?: ResponseInit
) => Response;
