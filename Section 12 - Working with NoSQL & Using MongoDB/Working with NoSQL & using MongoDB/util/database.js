const mongodb = require("mongodb");

const MongoCLient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoCLient.connect("CONNECTION URL")
    .then((client) => {
      console.log("Connected");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
