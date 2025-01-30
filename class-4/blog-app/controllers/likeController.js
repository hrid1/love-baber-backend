const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// like post
const likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    // save like
    const savedLike = await like.save();

    // update the post collection basis on this
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    );
    res.status(201).json({
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error While liking Post",
    });
  }
};
// disLiike post
const disLikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    // find and delete like in like Collection
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });
    // update the postCollection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $pull: { likes: deletedLike._id },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      post: updatedPost,
      message: "Successfully disliked!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error While disliking Post",
    });
  }
};

module.exports = { likePost, disLikePost };
