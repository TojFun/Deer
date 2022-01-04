import { DeerRequest } from "./classes/DeerRequest.ts";
import { Path } from "./classes/Path.ts";

export interface Handle {
  path: Path;
  method: HTTPMethod;
  handler: Handler;
}

export interface Param {
  param: string;
  index: number;
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

export type Handler = (req: DeerRequest) => Response | Promise<Response>;
