require('dotenv').config();
const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();
const app = express();
 
// Example GET route
router.get('/get', async (req, res) => {
  const db = req.db;
  const collection = db.collection('treatments');
  const milk = await collection.find({}).toArray();
  res.send(milk);
  console.log(milk);
});

// Find one document by ID
router.get('/get/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('treatments');
  const document = await collection.findOne({ _id: new ObjectId(req.params.id) });
  res.json(document);
});

// Example POST route
router.post('/add', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('treatments');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a document by ID
router.put('/set/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('treatments');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
  console.log("set data", req.body);

});

// Delete a treatments by ID
router.delete('/delete/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('treatments');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
  console.log("deleted successful");
});

module.exports = router;