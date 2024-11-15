const mysql = require("mysql2");

const connectDatabase = () => {
  const databaseName = process.env.database;
  const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
  });

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

  return connection;
};

const checkTableExistence = async (connection, tableName, sql) => {
  try {
    const tableQuery = `SHOW TABLES LIKE '${tableName}_subjects_registered'`;
    const result = await new Promise((resolve, reject) => {
      connection.query(tableQuery, (error, results, fields) => {
        if (results) {
          const affectRows = parseInt(results.length);
          if (affectRows > 0) {
            resolve(results);
          } else {
            resolve([]);
            reject(error);
          }
        } else {
          resolve([]);
        }
      });
    });
    return result;
  } catch (error) {
    return "Error:" + error;
  }
};

const createTable = async (connection, tableName, sql) => {
  try {
    const tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${sql})`;
    const result = await new Promise((resolve, reject) => {
      connection.query(tableQuery, (error, results, fields) => {
        if (error) {
          console.error("Error creating table:", error);
          reject(error);
        } else {
          console.log(`Table ${tableName} created or already exists`);
          resolve(results);
        }
      });
    });
  } catch (error) {}
};

const insertTable = async (connection, sql, params) => {
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [params], (error, results, fields) => {
        const affectRows = parseInt(results.affectedRows);
        if (affectRows > 0) {
          resolve(affectRows);
        } else {
          reject(error);
        }
      });
    });
    return result;
  } catch (error) {
    return "Error:" + error;
  }
};
const updateTable = async (connection, sql, params) => {
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [...params], (error, results, fields) => {
        const affectRows = parseInt(results.affectedRows);
        if (affectRows > 0) {
          resolve(affectRows);
        } else {
          reject(error);
        }
      });
    });
    return result;
  } catch (error) {
    return "Error:" + error;
  }
};

const selectTable = async (connection, sql) => {
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, (error, results, fields) => {
        if (results) {
          const affectRows = parseInt(results.length);
          if (affectRows > 0) {
            resolve(results);
          } else {
            resolve([]);
            reject(error);
          }
        } else {
          resolve([]);
        }
      });
    });

    return result;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
};

export {
  connectDatabase,
  createTable,
  insertTable,
  selectTable,
  updateTable,
  checkTableExistence,
};
