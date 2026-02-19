import express from "express";
import process from "node:process";
import cors from "cors";

import { ApiResponse } from "./utils/apiResponse.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

function startApp() {
  const app = express();

  //disabe x powered by from express
  app.disable("x-powered-by");

  //CORS settings
  const corsOrigin = process.env.CORS_ORIGIN || "*";
  app.use(
    cors({
      origin: corsOrigin.split(","),
      credentials: true,
      exposedHeaders: "*",
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    }),
  );

  app.use(
    express.json({
      limit: "5mb",
      type: "application/json",
    }),
  );

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    return res.status(200).json(new ApiResponse(200));
  });

  app.get("/", (req, res) => {
    res.send("API running");
  });

  // Error handling middleware
  app.use(errorHandler);

  return app;
}

export { startApp };
