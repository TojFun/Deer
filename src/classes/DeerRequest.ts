import { Param } from "./../types.ts";
import { Path } from "./Path.ts";

export class DeerRequest extends Request {
  uri: URL;
  path: Path;

  constructor(request: Request, public params: { [key: string]: Param }) {
    super(request);
    this.uri = new URL(request.url);
    this.path = new Path(this.uri.pathname);
  }
}
