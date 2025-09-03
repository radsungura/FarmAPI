require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const express = require("express");
const router = express.Router();
const app = express();

// Example GET route
router.get('/get', async (req, res) => {
  const db = req.db;
  const collection = db.collection('milk');
  const milk = await collection.find({}).toArray();
  res.send(milk);
  console.log("milk", res, milk);
});


// Find one milk by ID
router.get('/get/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('milk');
  console.log("id", typeof (req.params.id));
  const milk = await collection.findOne({ _id: new ObjectId(req.params.id) });
  console.log("id", milk);
  // res.send(milk);
  res.status(200).json(milk);
});

// Example POST route
router.post('/add', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('milk');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a document by ID
router.put('/set/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('milk');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
  console.log("set data", req.body);

});

// Delete a document by ID
router.delete('/delete/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('milk');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

module.exports = router;