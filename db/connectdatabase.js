const mysql = require("mysql2");
const databaseName = process.env.database;
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
});

console.log(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);

connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (error) => {
  if (error) {
    console.error("Error creating database:", error);
  } else {
    console.log(`Database "${databaseName}" created or already exists`);
  }
});

connection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected Successfully");
  }
});
export default connection;
