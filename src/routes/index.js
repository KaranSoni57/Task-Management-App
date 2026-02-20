import { Router } from "express";
import { createUsersRouter } from "./auth/user.routes.js";

function createRouter() {
  const router = Router();

  router.use("/users", createUsersRouter());

  return router;
}

export { createRouter };
