const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'farm';
let db;

const connectToMongo = async () => {
    const client = new MongoClient(url, {});
  await client.connect();
  console.log('Connected successfully to MongoDB server');
  db = client.db(dbName);
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not connected!');
  }
  return db;
};

module.exports = { connectToMongo, getDb };