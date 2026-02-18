import express from "express";
import process from "node:process";
import cors from "cors";

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

  app.get("/", (req, res) => {
    res.send("API running");
  });

  return app;
}

export { startApp };
