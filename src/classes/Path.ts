export class TemplatePath {
  splitted: string[];
  raw: string;

  constructor(path: string) {
    this.splitted = TemplatePath.split(path);
    this.raw = path;

    this.validate();
  }

  static split = (path: string) =>
    path
      .slice(1)
      .split("/")
      .filter((path: string) => path !== "");

  add(path: TemplatePath) {
    if (!path.raw.startsWith("/")) throw new Error("A path must start with /");
    return new TemplatePath(this.raw + path.raw);
  }

  static fromFullURI(url: string) {
    return new TemplatePath(new URL(url).pathname);
  }

  private validate() {
    if (!this.raw.startsWith("/")) throw new Error("A path must start with /");

    this.splitted.forEach((path: string) => {
      if (!path.match(/^[a-zA-Z0-9:]+$/))
        throw new Error(
          `A path must be a string composed of letters and numbers. The path ${path} is invalid.`
        );
    });
  }
}

export class Path extends TemplatePath {
  constructor(path: string) {
    super(path);

    this.validateColons();
  }

  private validateColons() {
    this.splitted.forEach((path: string) => {
      if (path.match(/:/))
        throw new Error(`A path can't have ":"s. The path ${path} is invalid.`);
    });
  }
}
