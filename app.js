require('dotenv').config();
const cors = require('cors');
const express = require("express");
const app = express();
const { connectToMongo, getDb } = require('./db');
const port = process.env.PORT || 3000;



// app.use(cors({
//   origin: /http:\/\/rad-pc/
// }));

// Enable CORS for specific origins
const corsOptions = {
  origin: 'http://localhost:4200', //  Allowed origin
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));
// default but not secure, all origin 
// app.use(cors()); 



// Import the routes
const milk = require('./router/milk');
const cows = require('./router/cows');
const treats = require('./router/treats');

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

app.use('/api/cows', (req, res, next) => {
  req.db = getDb();
  next();
}, cows);

app.use('/api/milk', (req, res, next) => {
  req.db = getDb();
  next();
}, milk);

app.use('/api/treatments', (req, res, next) => {
  req.db = getDb();
  next();
}, treats);

app.listen(port, () => {
  console.log(`Server is running on http://192.168.0.100:${port}`);
  });
