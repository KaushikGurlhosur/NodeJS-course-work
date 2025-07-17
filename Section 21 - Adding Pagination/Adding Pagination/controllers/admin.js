const Product = require("../models/product");

const fileHelper = require("../util/file");

const { validationResult } = require("express-validator");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));

  // if (!req.session.isLoggedIn) {
  //   return res.redirect("/login");
  // }

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
    // isAuthenticated: req.session.isLoggedIn, // isAuthenticated is not required in all the render methods - because we are passing it through the middleware in app.js
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const description = req.body.description;
  const price = req.body.price;

  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,

        description: description,
        price: price,
      },
      errorMessage: "Attached file is not an image",
      validationErrors: [],
    });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,

        description: description,
        price: price,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const imageUrl = image.path; //path of the image stored in the folder image

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user, // This will add the entire user doc but mongoose will only pick the _id. Alternatively it can be written as - req.user_id
  });

  // req.user.createProduct();

  product
    .save() // This is coming from Mongoose
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      // console.log(err);
      // return res.status(500).render("admin/edit-product", {
      //   pageTitle: "Add Product",
      //   path: "/admin/add-product",
      //   editing: false,
      //   hasError: true,
      //   product: {
      //     title: title,
      //     imageUrl: imageUrl,
      //     description: description,
      //     price: price,
      //   },
      //   errorMessage: "Database operation failed, Please try again.",
      //   validationErrors: [],
      // });
      // ____________________________
      // Instead of redirecting 500 - we can do the below by throwing a new error
      // res.redirect("/500");

      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // /admin/edit-product/24?edit=true
  if (!editMode) {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => {
      // console.log(err);
      // res.redirect("/500");

      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDescription = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: false,
      hasError: true,
      product: {
        title: updatedTitle,

        price: updatedPrice,
        description: updatedDescription,
        _id: prodId,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;

      if (image) {
        // if there is an image, then delete the old image
        fileHelper.deleteFile(product.imageUrl); // delete the old image file
        product.imageUrl = image.path; // update the imageUrl with the new image path
      }

      return product
        .save() // This is a Mongoose method that updates the product in the database
        .then(() => {
          console.log("UPDATED PRODUCT!");
          res.redirect("/admin/products");
        });
    })

    .catch((err) => {
      // console.log(err);
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findByIdAndDelete(prodId) //findByIdAndDelete is a Mongoose method that deletes the product by its ID

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return next(new Error("Product not found."));
      }
      fileHelper.deleteFile(product.imageUrl); // delete the image file associated with the product
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then((product) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      // console.log(err);
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select("title price -_id") // here we are getting only title and price, and adding - to _id to exclude it.
    // .populate("userId", "name") // this gives the entire user object - with name, email.
    .then((products) => {
      // console.log(products);
      res.render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        prods: products,
      });
    })
    .catch((err) => {
      // console.log(err);
      const error = new Error(err);

      error.httpStatusCode = 500;
      return next(error);
    });
};
