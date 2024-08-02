require('dotenv').config();
const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();
const app = express();
 
// Example GET route
router.get('/get', async (req, res) => {
  const db = req.db;
  const collection = db.collection('treatments');
  const treat = await collection.find({}).toArray();
  res.send(treat);
  // console.log(treat);
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
  // console.log("add data", req.body);
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
  console.log("set data", req.body, req.params.id);

});

// Delete a treatments by ID
router.delete('/delete/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('treatments');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
  // console.log("deleted successful", req.body);
});

module.exports = router;