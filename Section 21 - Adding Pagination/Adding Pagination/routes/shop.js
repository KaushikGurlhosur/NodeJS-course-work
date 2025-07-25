const express = require("express");

const shopController = require("../controllers/shop");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct); // productId is a placeholder and can be used to get the product id from the URL

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart); // this is the route for the cart post request

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.post("/create-order", isAuth, shopController.postOrder);

router.get("/orders", isAuth, shopController.getOrders);

// router.get("/checkout", shopController.getCheckout);

router.get("/orders/:orderId", isAuth, shopController.getInvoice);

module.exports = router;
