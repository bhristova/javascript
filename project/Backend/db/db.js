// const config = require('../config');

//TODO: replace with mySQL
const MongoClient = require('mongodb').MongoClient;
let db = null;

const config = {
  db: {
    url: 'mongodb://localhost:27017',
    name: 'brokeNoMore'
  }
}

module.exports.getDb = () => {
  if(!db) {
    this.connect();
  }
  return db;
};

module.exports.connect = () => {
  return MongoClient.connect(config.db.url)
    .then(client => {
      console.log(`Connected to database ${config.db.name}`);
      db = client.db(config.db.name);
      return db;
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
}