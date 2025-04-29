const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct); // productId is a placeholder and can be used to get the product id from the URL

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart); // this is the route for the cart post request

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
