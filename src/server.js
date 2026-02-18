import "./config/env.config.js";
import process from "node:process";
import connectDB from "./db/connection.js";
import { startApp } from "./app.js";

/**
 * @description Start the server
 *
 * @return {Promise<Express>}
 */
async function startServer() {
  try {
    await connectDB();

    return startApp();
  } catch (error) {
    console.log("Failed to start the server: ", error);
    process.exit(1);
  }
}

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== "test") {
  (async () => {
    try {
      const app = await startServer();
      const PORT = Number(process.env.PORT) || 8000;
      app.listen(PORT, () => {
        console.log("\n server is running on port: ", PORT);
      });
    } catch (error) {
      console.log("Failed to listen to server: ", error);
      process.exit(1);
    }
  })();
}

export { startServer };
