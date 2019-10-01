// let's go!
require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

//TODO express middleware to handle cookies (jwt)
//TODO express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  server => {
    console.log(`Server running on http://localhost:${server.port}`);
  }
);
