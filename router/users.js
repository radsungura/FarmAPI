const { ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// login

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const db = req.db;
  const Users = db.collection('Users');
  const user = await Users.findOne({ username });
  // Rechercher l'utilisateur dans la base de données
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  } else {
      // Vérifier le mot de passe
      // const isMatch = await bcrypt.compare(password, user.password);
    try {
      if (user.password != password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      } else {
        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        user.token = token
        return res.json({ user });
      }
    }catch (error) {
      return res.status(500).json({ message: 'Server error', Error: error });
    }
  }
});

router.get('/get', async (req, res) => {
  const db = req.db;
  const usersCollection = db.collection('Users');
  const users = await usersCollection.find({}).toArray();
  res.send(users);
});

router.get("/get/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const cow = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!cow) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(cow);
})

// Add a new cow

router.post('/add', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('Users');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a cow by ID

router.put('/set/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a cow by ID

router.delete('/delete/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
