import { Router } from "./Router.ts";
import { DeerRequest } from "./DeerRequest.ts";
import { Handle, HTTPMethod, Handler } from "../types.ts";
import { TemplatePath, Path } from "./Path.ts";

import { serve } from "../dep.ts";

export class App {
  private possibleRequests: Handle[] = [];

  private use = (path: TemplatePath, method: HTTPMethod, handler: Handler) => {
    this.possibleRequests.push({ path, method, handler });
  };

  public get = (path: string, handler: Handler) =>
    this.use(new TemplatePath(path), "GET", handler);
  public post = (path: string, handler: Handler) =>
    this.use(new TemplatePath(path), "POST", handler);
  public put = (path: string, handler: Handler) =>
    this.use(new TemplatePath(path), "PUT", handler);
  public delete = (path: string, handler: Handler) =>
    this.use(new TemplatePath(path), "DELETE", handler);

  private handle = (req: Request): Response | Promise<Response> => {
    const pathname = Path.fromFullURI(req.url);

    const currentRequest = this.getRequestHandler(pathname, req.method);
    if (!currentRequest) return new Response("Not found", { status: 404 });

    return currentRequest.handler(
      new DeerRequest(req, currentRequest.path, pathname)
    );
  };

  private getRequestHandler = (pathname: TemplatePath, currentMethod: string) =>
    this.possibleRequests.find(
      ({ path, method }) =>
        method === currentMethod &&
        path.splitted.every(
          (part, index) =>
            part.startsWith(":") || part === pathname.splitted[index]
        )
    );

  public route = (path: string, router: Router) => {
    const routePath = new TemplatePath(path);

    router.connect().forEach(({ path, method, handler }) => {
      this.use(routePath.add(path), method, handler);
    });
  };

  public listen = (port: number) => {
    console.log(`serving on http://localhost:${port}/`);
    serve(this.handle, { port });
  };
}
