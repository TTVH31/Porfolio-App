var mysql = require('mysql');
require('dotenv').config()

var pool = mysql.createPool({
  connectionLimit: 30,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

let stockdb = {};

// Return all records from a table
stockdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM stock`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

module.exports = stockdb;