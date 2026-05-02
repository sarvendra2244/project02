const mongo = require('mongodb');

const mongoClient =mongo.MongoClient;

const mongoURI = process.env.MONGO_URI;

const mongoUrl = "mongodb+srv://sarvendra2244:Ss123325@skscluster.mxbabc5.mongodb.net/?appName=skscluster";

let _db;
const mongoConnect=(callback)=>{
  mongoClient.connect(mongoUrl).then((client)=>{
    callback();
    _db=client.db('rentalSpace');
  })
  .catch((error)=>{
    console.log(error);
  });
};

const getDb=()=>{
  if(!_db){
    throw new Error("Mongodb is not connected");
  }
  return _db;
}
exports.getDb= getDb;
exports.mongoConnect=mongoConnect;
