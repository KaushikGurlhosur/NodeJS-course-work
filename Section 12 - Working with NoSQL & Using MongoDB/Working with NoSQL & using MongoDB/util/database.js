const mongodb = require("mongodb");

const MongoCLient = mongodb.MongoClient;

let _db; // _ indicates that it's only used in this file

const mongoConnect = (callback) => {
  MongoCLient.connect(
    "mongodb+srv://kaushikGurlhosur:depcy5-fermuw-nyGvaz@cluster0.jpqdz3m.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db(); // i can overide the shop here.
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
