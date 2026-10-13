const app = require("./app");
const env = require("./lib/config/env");
const http = require("http");

const connectDB = require("./lib/db/db");
const logger = require("./pkg/logger/logger");
const { default: mongoose } = require("mongoose");
connectDB();

const server = http.createServer(app);
server.listen(env.port, () => logger.info("server running in port 3000 ✅"));

async function shutdown() {
  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
}
process.on("SIGINT", shutdown); // // crtl +   c
process.on("SIGTERM", shutdown);
