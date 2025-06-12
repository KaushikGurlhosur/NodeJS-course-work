const mongodb = require("mongodb");

const MongoCLient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoCLient.connect(
    "mongodb+srv://kaushikGurlhosur:depcy5-fermuw-nyGvaz@cluster0.jpqdz3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
