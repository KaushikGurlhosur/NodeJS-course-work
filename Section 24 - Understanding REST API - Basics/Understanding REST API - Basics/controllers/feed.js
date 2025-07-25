exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        id: "1",
        title: "First Post",
        content: "This is the first post!",
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const { title, content } = req.body;
  console.log(title, content);
  // Create post in db
  res.status(201).json({
    message: "Post created successfully",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
