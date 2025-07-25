const fs = require("fs");
const path = require("path");

const PDFDocument = require("pdfkit");

const Order = require("../models/order");
const Product = require("../models/product");

const ITEMS_PER_PAGE = 2; // Number of items per page for pagination.

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.find()
    .countDocuments() // Get the total number of products
    .then((numProducts) => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      // console.log(err);
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // findById is from mongoose and we can pass a string and it will convert it to an ObjectId
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        product: product,
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      // console.log(err);
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.find()
    .countDocuments() // Get the total number of products
    .then((numProducts) => {
      totalItems = numProducts; // Store the total number of products
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE) // Skip the items of previous pages
        .limit(ITEMS_PER_PAGE); // Limit the number of items to ITEMS_PER_PAGE
    })

    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      // console.log(err);
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      // console.log(err)
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });

  // Cart.getCart((cart) => {
  //   Product.findAll().then((products) => {
  //     const cartProducts = [];
  //     for (let product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cart.products.find((prod) => prod.id === product.id)) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       pageTitle: "Your Cart",
  //       path: "/cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId).then((product) => {
    return req.user.addToCart(product).then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log(prodId);

  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return {
          quantity: i.quantity,
          product: { ...i.productId._doc },
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          email: req.user.email,
          _id: req.user,
        },
        products: products,
      });
      order.save();
    })
    // .then(() => {
    //   req.user.cart = { items: [] };
    //   return req.user.save();
    // })
    .then(() => {
      req.user.clearCart();
      res.redirect("/orders");
    })
    .catch((err) => {
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user._id": req.session.user._id })
    .then((orders) => {
      // console.log(orders);
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     pageTitle: "Checkout",
//     path: "/checkout",
//   });
// };

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;

  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return next(new Error("No order found."));
      }

      if (order.user._id.toString() !== req.user._id.toString()) {
        return next(new Error("Unauthorized access"));
      }

      const invoiceName = "invoice-" + orderId + ".pdf";

      const invoicePath = path.join("data", "invoices", invoiceName);

      const pdfDoc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf"); // Set the content type to PDF and it opens in the browser instead of downloading
      res.setHeader(
        "Content-Disposition",
        "inline; filename=" + invoiceName + '"'
      ); // This will display the PDF in the browser instead of downloading it

      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res); // Pipe the PDF document to the response

      // pdfDoc.text("Hello world");
      pdfDoc.fontSize(26).text("Invoice", {
        underline: true,
        align: "center",
      });
      pdfDoc.text("--------------------------------------------", {
        align: "center",
      });
      let totalPrice = 0;

      order.products.forEach((prod) => {
        totalPrice += prod.quantity * prod.product.price;
        pdfDoc
          .fontSize(14)
          .text(
            prod.product.title +
              " - " +
              prod.quantity +
              " x " +
              "$" +
              prod.product.price
          );
      });
      pdfDoc.text("--------------------------------------------", {
        align: "center",
      });
      pdfDoc.fontSize(22).text("Total Price: $ " + totalPrice, {
        align: "center",
      });

      pdfDoc.end();

      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     return next(err);
      //   }
      // res.setHeader("Content-Type", "application/pdf"); // Set the content type to PDF and it opens in the browser instead of downloading
      // res.setHeader(
      //   "Content-Disposition",
      //   "inline; filename=" + invoiceName + '"'
      // ); // This will display the PDF in the browser instead of downloading it
      //   // res.setHeader(
      //   //   "Content-Disposition",
      //   //   "attachment; filename=" + invoiceName + '"'
      //   // ); // This will prompt the user to download the file with the given name
      //   res.send(data);
      // });

      // const file = fs.createReadStream(invoicePath);
      // res.setHeader("Content-Type", "application/pdf"); // Set the content type to PDF and it opens in the browser instead of downloading
      // res.setHeader(
      //   "Content-Disposition",
      //   "inline; filename=" + invoiceName + '"'
      // ); // This will display the PDF in the browser instead of downloading it

      // file.pipe(res); // Pipe the file stream to the response
    })
    .catch((err) => {
      next(err);
    });
};
