const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res
        .status(200)
        .json({ message: "Fetched posts successfully.", posts: posts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // Internal Server Error
      }
      next(err); // Pass the error to the next middleware
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422; // Unprocessable Entity
    throw error;

    // return res.status(422).json({
    //   message: "Validation failed, entered data is incorrect.",
    //   errors: errors.array(),
    // });
  }

  const { title, content } = req.body;
  // console.log(title, content);
  // Create post in db

  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/kaushik.png", // Placeholder image URL
    creator: {
      name: "Kaushik Gurlhosur",
    },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // Internal Server Error
      }
      next(err); // Pass the error to the next middleware
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404; // Not Found
        throw error;
      }

      res.status(200).json({ message: "Post fetched.", post: post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // Internal Server Error
      }
      next(err);
    });
};
