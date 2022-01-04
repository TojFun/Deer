export class Path {
  splitted: string[];

  constructor(public raw: string) {
    if (!raw.startsWith("/")) throw new Error("A path must start with /");
    this.splitted = raw.split("/");
  }

  add(path: Path) {
    if (!path.raw.startsWith("/")) throw new Error("A path must start with /");
    return new Path(this.raw + path.raw);
  }
}
