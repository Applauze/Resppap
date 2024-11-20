const mysql = require("mysql2");
const databaseName = process.env.database;
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
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
