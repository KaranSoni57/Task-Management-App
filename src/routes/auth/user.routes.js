import { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/user.controllers.js";
import { verifyAuthorizationToken } from "../../middlewares/auth.middlewares.js";

/**
 * Creates and configures the users router
 * @returns {Router} The configured users router
 */
function createUsersRouter() {
  const router = Router();

  router.route("/register").post(registerUser);
  router.route("/login").post(loginUser);

  router.use(verifyAuthorizationToken);

  router.route("/logout").post(logoutUser);
  router.route("/").get(getUser);

  return router;
}

export { createUsersRouter };
