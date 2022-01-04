import { Router } from "./Router.ts";
import { DeerRequest } from "./DeerRequest.ts";
import { Handle, HTTPMethod, Handler, Param } from "../types.ts";
import { Path } from "./Path.ts";

import { serve } from "../dep.ts";

export class App {
  private possibleRequests: Handle[] = [];

  private use = (path: Path, method: HTTPMethod, handler: Handler) => {
    this.possibleRequests.push({ path, method, handler });
  };

  public get = (path: string, handler: Handler) =>
    this.use(new Path(path), "GET", handler);
  public post = (path: string, handler: Handler) =>
    this.use(new Path(path), "POST", handler);
  public put = (path: string, handler: Handler) =>
    this.use(new Path(path), "PUT", handler);
  public delete = (path: string, handler: Handler) =>
    this.use(new Path(path), "DELETE", handler);

  private handle = (req: Request): Response | Promise<Response> => {
    const pathname = new URL(req.url).pathname;

    const currentRequest = this.possibleRequests.find(({ path }) =>
      pathname.startsWith(path.raw)
    );

    if (!currentRequest) return new Response("Not found", { status: 404 });

    const { path } = currentRequest;
    const params: { [key: string]: Param } = {};

    path.splitted.forEach((potentialParam: string, index: number) => {
      if (potentialParam.startsWith(":")) {
        params[potentialParam.slice(1)] = {
          param: new Path(pathname).splitted[index],
          index,
        };
      }
    });

    return currentRequest.handler(new DeerRequest(req, params));
  };

  public listen = (port: number) => {
    console.log(`serving on http://localhost:${port}/`);
    serve(this.handle, { port });
  };

  public route = (path: string, router: Router) => {
    const routePath = new Path(path);

    router.connect().forEach(({ path, method, handler }) => {
      this.use(routePath.add(path), method, handler);
    });
  };
}
