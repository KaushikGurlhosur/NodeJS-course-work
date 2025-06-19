const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this.id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("User Created");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    // const cartProducts = this.cart.items.findIndex((cp) => {
    //   return cp._id === product._id;
    // });
    product.quantity = 1; // setting quantity to 1 for the new product /
    const updateCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this.id) },
        { $set: { cart: updateCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
