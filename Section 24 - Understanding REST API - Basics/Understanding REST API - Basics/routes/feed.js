const router = require("express").Router();

const feedController = require("../controllers/feed");

// /feed/posts
router.get("/posts", feedController.getPosts);

// /feed/post
router.post("/post", feedController.createPost);

module.exports = router;
