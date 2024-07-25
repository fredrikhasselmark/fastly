import { Router } from "@fastly/expressly";

const HOMEPAGE_ORIGIN = "origin_1";
const STATUS_ORIGIN = "origin_0";
const router = new Router();

// If the URL begins with /status/
router.get("/status/(.*)", async (req, res) => {
  // Send the request to the status backend.
  res.send(await fetch(req, {
    backend: STATUS_ORIGIN
  }));
});

router.get("/", async (req, res) => {
  // Send the request to the homepage backend.
  res.send(await fetch(req, {
    backend: HOMEPAGE_ORIGIN
  }));
});

router.all("(.*)", (req, res) => {
  res.withStatus(404).send("The page you requested could not be found");
});

router.listen();
