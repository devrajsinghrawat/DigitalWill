var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host        : "localhost",
    user        : "root",
    password    : "",
    port        : "",
    database    : "digitalwill"
  });

module.exports = pool;
