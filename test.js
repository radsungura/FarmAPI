const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Database Name
const dbName = 'mydatabase';

async function main() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    // Define a collection
    const collection = db.collection('documents');

    // Insert some documents
    const insertResult = await collection.insertMany([ { number: "000", color: "blanc", name: "Bitaho", dad: "Rwabigoro", mum: "Mariza", race: "Frisone", mixLevel: 2, originFarm: "Kiryama", birth: "2000-02-01", fWeaning: "2001-02-01", sexe: "Femelle", fSoiled: "2004-02-01", fCalving: "2004-11-01" },
        {number:"001",color:"blanc",name:"Bizima",dad:"Rwabigoro",mum:"Mubera",race:"Frisone",mixLevel:2,originFarm:"Kiryama",birth:"2000-02-01",fWeaning:"2001-02-01",sexe:"Femelle",fSoiled:"2004-02-01",fCalving:"2004-11-01"},
        {number:"002",color:"Noire",name:"Rwamadudu",dad:"Rwabwami",mum:"Madudu",sexe:"Male",race:"Sahiwal",mixLevel:2,originFarm:"Kiryama",birth:"1995-05-01",fWeaning:"1995-11-04"},
        {number:"003",color:"Noire",name:"Rwabugiri",dad:"Rwamutsama",mum:"Bugiri",sexe:"Male",race:"Sahiwal",mixLevel:2,originFarm:"Kiryama",birth:"1995-05-01",fWeaning:"1995-11-04"},
        {number:"004",color:"Brun",name:"Ngoma",dad:"Rwamadudu",mum:"Bizima",race:"Sahiwal",mixLevel:3,originFarm:"Kiryama",birth:"2000-02-01",fWeaning:"2000-08-02",sexe:"Femelle",fSoiled:"2004-05-05",fCalving:"2005-02-08"},
        {number:"005",color:"Noire",name:"Rwabitaho",dad:"Rwabugiri",mum:"Bitaho",sexe:"Male",race:"Sahiwal",mixLevel:2,originFarm:"Kiryama",birth:"1995-05-01",fWeaning:"1995-11-04"},
        {number:"006",color:"Noire",name:"Rwabizima",dad:"Rwamadudu",mum:"Bizima",sexe:"Male",race:"Sahiwal",mixLevel:2,originFarm:"Kiryama",birth:"1995-05-01",fWeaning:"1995-11-04"},
        {number:"007",color:"blanc",name:"Makuru",dad:"Rwabugiri",mum:"Bitaho",race:"Sahiwal",mixLevel:2,originFarm:"Kiryama",birth:"2000-02-01",fWeaning:"2001-02-01",sexe:"Femelle",fSoiled:"2004-02-01",fCalving:"2004-11-01"},
        {number:"008",color:"blanc",name:"Kemo",dad:"Rwamadudu",mum:"Bizima",race:"Sahiwal",mixLevel:2,originFarm:"Kiryama",birth:"2000-02-01",fWeaning:"2001-02-01",sexe:"Femelle",fSoiled:"2004-02-01",fCalving:"2004-11-01"},
        {number:"009",color:"blanc",name:"Murwa",dad:"Rwabitaho",mum:"Ngoma",race:"Sahiwal",mixLevel:2,originFarm:"Kiryama",birth:"2000-02-01",fWeaning:"2001-02-01",sexe:"Femelle",fSoiled:"2004-02-01",fCalving:"2004-11-01"},
        {number:"010",color:"blanc",name:"Yamakuru",dad:"Rwabizima",mum:"Makuru",race:"Frisone",mixLevel:2,originFarm:"Kiryama",birth:"2000-02-01",fWeaning:"2001-02-01",sexe:"Femelle",fSoiled:"2004-02-01",fCalving:"2004-11-01"},
        {number:"011",color:"Noire",name:"Rwakemo",dad:"Rwabitaho",mum:"Kemo",sexe:"Male",race:"Sahiwal",mixLevel:2,originFarm:"Kiryama",birth:"1995-05-01",fWeaning:"1995-11-04"},
        {number:"012",color:"blanc",name:"Bihayi",dad:"Rwakemo",mum:"Murwa",race:"Sahiwal",mixLevel:2,originFarm:"Kiryama",birth:"2000-02-01",fWeaning:"2001-02-01",sexe:"Femelle",fSoiled:"2004-02-01",fCalving:"2004-11-01"},
        {number:"013",color:"blanc",name:"Mwaka",dad:"Rwabitaho",mum:"Kemo",race:"Frisone",mixLevel:2,originFarm:"Kiryama",birth:"2000-02-01",fWeaning:"2001-02-01",sexe:"Femelle",fSoiled:"2004-02-01",fCalving:"2004-11-01"},
        {number:"014",color:"Brun",name:"Mutsama",dad:"Rwakemo",mum:"Bihayi",race:"Sahiwal",mixLevel:3,originFarm:"Kiryama",birth:"2000-02-01",fWeaning:"2000-08-02",sexe:"Femelle",fSoiled:"2004-05-05",fCalving:"2005-02-08"},
        { number: "015", color: "blanc", name: "Bitamo", dad: "Rwabitaho", mum: "Kemo", race: "Frisone", mixLevel: 2, originFarm: "Kiryama", birth: "2000-02-01", fWeaning: "2001-02-01", sexe: "Femelle", fSoiled: "2004-02-01", fCalving: "2004-11-01" }
    ]);
    console.log('Inserted documents:', insertResult);

    // Find all documents
    const findResult = await collection.find({}).toArray();
    console.log('Found documents:', findResult);

  } catch (err) {
    console.error('An error occurred while connecting to MongoDB:', err);
  } finally {
    // Close connection
    await client.close();
  }
}

main().catch(console.error);