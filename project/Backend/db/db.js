const mysql = require('mysql');
const config = require('../config');

let db = null;

module.exports.getDb = () => db;

module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database
    });
    
    connection.connect((err) => {
      if(err) {
        return reject(err);
      }
  
      db = connection;
      return resolve(db);
    });
  });
}
