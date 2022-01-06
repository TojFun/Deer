import { Router } from "./../src/classes/Router.ts";
import { App } from "../src/classes/App.ts";

const app = new App();
const router = new Router();

app.get("/momo/:name", (req, res) => res(req.params.name));

router.get("/", (req) => {
  return new Response("Hello world!");
});

app.route("/momo", router);

app.listen(8000);
