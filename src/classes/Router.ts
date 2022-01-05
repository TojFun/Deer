import { TemplatePath } from "./Path.ts";
import { Handle, Handler, HTTPMethod } from "../types.ts";

export class Router {
  private possibleRequests: Handle[] = [];

  private use = (path: TemplatePath, method: HTTPMethod, handler: Handler) =>
    this.possibleRequests.push({ path, method, handler });

  public get = (path: string, handler: Handler) =>
    this.use(new TemplatePath(path), "GET", handler);
  public post = (path: string, handler: Handler) =>
    this.use(new TemplatePath(path), "POST", handler);
  public put = (path: string, handler: Handler) =>
    this.use(new TemplatePath(path), "PUT", handler);
  public delete = (path: string, handler: Handler) =>
    this.use(new TemplatePath(path), "DELETE", handler);

  public connect = () => {
    return this.possibleRequests;
  };
}
