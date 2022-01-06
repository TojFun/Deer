import { TemplatePath, Path } from "./Path.ts";

export class DeerRequest extends Request {
  private template: TemplatePath;
  private actualPath: Path;
  private _params: { [key: string]: string } = {};

  uri: URL;

  constructor(
    request: Request,
    templatePath: string | TemplatePath,
    thePath: string | Path
  ) {
    super(request);
    this.uri = new URL(request.url);

    this.template =
      templatePath instanceof TemplatePath
        ? templatePath
        : new TemplatePath(templatePath);
    this.actualPath = thePath instanceof Path ? thePath : new Path(thePath);

    this.setParams();
  }

  private setParams() {
    this.template.splitted.forEach((potentialParam: string, index: number) => {
      if (potentialParam.startsWith(":"))
        this._params[potentialParam.slice(1)] = this.actualPath.splitted[index];
    });
  }

  get params(): { [key: string]: string } {
    return this._params;
  }

  paramIndex(paramName: string): number {
    return this.template.splitted.indexOf(`:${paramName}`);
  }

  get splittedPath(): string[] {
    return this.actualPath.splitted;
  }

  get path() {
    return this.actualPath;
  }
}
