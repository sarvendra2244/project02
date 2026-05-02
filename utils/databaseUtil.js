// utils/databaseUtil.js
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI; // keep your URI in Render env vars
let _db;

const mongoConnect = async () => {
  try {
    const client = await MongoClient.connect(mongoURI);
    _db = client.db(); // default DB or specify: client.db('rentalspace')
    console.log("MongoDB connected successfully");
    return _db;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
};

const getDb = () => {
  if (_db) return _db;
  throw new Error("No database found!");
};

module.exports = { mongoConnect, getDb };

