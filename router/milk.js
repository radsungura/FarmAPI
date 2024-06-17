require('dotenv').config();
const express = require("express");
const router = express.Router();
const app = express();
 
// Example GET route
router.get('/', async (req, res) => {
  const db = req.db;
  const collection = db.collection('milk');
  const milk = await collection.find({}).toArray();
  res.send(milk);
  console.log("milk", res, milk);
});

// Example POST route
router.post('/add', async (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection('cows');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Find one document by ID
router.get('/:id', async (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection('cows');
  const document = await collection.findOne({ _id: new ObjectId(req.params.id) });
  res.json(document);
});

// Update a document by ID
router.put('/:id', async (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection('cows');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
});

// Delete a document by ID
router.delete('/:id', async (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection('myCollection');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

module.exports = router;