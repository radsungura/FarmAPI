const { MongoClient, ObjectId  } = require('mongodb');

const url = 'mongodb+srv://rukunddiacre:fB05PLQs0GzAqdHP@cluster0.xwplm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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