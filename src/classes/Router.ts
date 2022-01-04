import { Path } from "./Path.ts";
import { Handle, Handler, HTTPMethod } from "../types.ts";

export class Router {
  private possibleRequests: Handle[] = [];

  private use = (path: Path, method: HTTPMethod, handler: Handler) =>
    this.possibleRequests.push({ path, method, handler });

  public get = (path: string, handler: Handler) =>
    this.use(new Path(path), "GET", handler);
  public post = (path: string, handler: Handler) =>
    this.use(new Path(path), "POST", handler);
  public put = (path: string, handler: Handler) =>
    this.use(new Path(path), "PUT", handler);
  public delete = (path: string, handler: Handler) =>
    this.use(new Path(path), "DELETE", handler);

  public connect = () => {
    return this.possibleRequests;
  };
}
