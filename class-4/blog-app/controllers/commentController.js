const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    const comment = new Comment({
      post,
      user,
      body,
    });

    const saveComment = await comment.save();
    //   find the post by Id and add new Comment in array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: saveComment._id },
      },
      { new: true }
    )
      .populate("comments")
      .exec();
    res.status(201).json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error While Create Comment",
    });
  }
};

module.exports = { createComment };
