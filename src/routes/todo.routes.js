import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controllers.js";
import { verifyAuthorizationToken } from "../middlewares/auth.middlewares.js";

/**
 * @returns {Router}
 */
function createTodosRouter() {
  const router = Router();

  router.use(verifyAuthorizationToken);

  router.route("/").post(createTodo).get(getTodos);

  router.route("/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);

  return router;
}

export { createTodosRouter };
