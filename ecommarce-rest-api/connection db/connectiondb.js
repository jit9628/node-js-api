const mysqlconnection = require('mysql2');
var connections = mysqlconnection.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"node"
  });

  module.exports=connections;

