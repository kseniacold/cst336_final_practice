const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
class DBConnection {
  constructor() {
    this.connection = mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      multipleStatements: true,
    });

    this.connect();

    // create tables if not exist
    const createSQLQueries = fs
      .readFileSync(path.join(__dirname, "/superhero.sql"))
      .toString();

    this.connection.query(createSQLQueries, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  getConnection() {
    return this.connection;
  }

  end() {
    this.connection.end((err) => {
      if (err) {
        console.error(err.message);
      }
    });
  }
}
const connectionInstance = new DBConnection();
module.exports = connectionInstance;
