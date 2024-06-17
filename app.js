require('dotenv').config();
const cors = require('cors');
const express = require("express");
const app = express();
const { connectToMongo, getDb } = require('./db');
const port = process.env.PORT || 3000;



app.use(cors({
  origin: /http:\/\/localhost/
}));

// Enable CORS for specific origins
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with your allowed origin
  optionsSuccessStatus: 200 // For legacy browser support
};
// default but not secure, all origin app.use(cors()); 

app.use(cors(corsOptions));

// Import the routes
const milk = require('./router/milk');
const cows = require('./router/cows');

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectToMongo().catch(err => {
  console.error(err);
  process.exit(1);
});

// Use the imported routes
// app.use('/', (req, res, next) => {
//   req.db = getDb();
//   next();
// }, cows);

app.use('/cows', (req, res, next) => {
  req.db = getDb();
  next();
}, cows);

app.use('/milk', (req, res, next) => {
  req.db = getDb();
  next();
}, milk);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  });
