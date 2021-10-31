require("dotenv").config();
const express = require("express");
const path = require("path");
const Server = require("./server/Server");

const app = express();
app.use(express.json());

const staticPath = path.join(__dirname, "/public");

const port = parseInt(process.env.PORT) || 80;
const server = new Server(app, staticPath);
server.start(port);
