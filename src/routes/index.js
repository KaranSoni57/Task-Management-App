import { Router } from "express";
import { createUsersRouter } from "./auth/user.routes.js";
import { createTodosRouter } from "./todo.routes.js";

function createRouter() {
  const router = Router();

  router.use("/users", createUsersRouter());
  router.use("/todos", createTodosRouter());

  return router;
}

export { createRouter };
