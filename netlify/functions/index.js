import http from "http";
import { config } from "dotenv";
import serverless from "serverless-http";
import app from "./app.js";
import * as logger from "./utils/logger.js";

if (process.env.NODE_ENV !== "production") {
  config();
}
// const server = http.createServer(app);

// const PORT = process.env.PORT || 3003;

// server.listen(PORT, () => {
//   logger.info(`Server running on port ${PORT}`);
// });

export const handler = serverless(app);