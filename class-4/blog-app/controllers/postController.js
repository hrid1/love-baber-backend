const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { title, body, author } = req.body;
    const post = new Post({
      title,
      body,
      author,
    });
    const savedPost = await post.save();
    res.status(201).json({
      success: true,
      post: savedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error creating post",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts =await Post.find({});
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Getting post",
    });
  }
};

module.exports = { createPost, getAllPosts };
