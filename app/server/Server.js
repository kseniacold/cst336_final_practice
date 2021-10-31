const express = require("express");
const api = require("./routes/api");

module.exports = class Server {
  constructor(app, staticPath) {
    this.app = app;

    this.app.use("/", express.static(staticPath));
    this.app.use("/api", api);
  }

  start(port) {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}!`)
    );
  }
};
