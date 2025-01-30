const router = require("express").Router();
const { createPost, getAllPosts } = require("../controllers/PostController");
const { likePost, disLikePost } = require("../controllers/LikeController");
const { createComment } = require("../controllers/CommentController");

//import controler

router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/disLike", disLikePost);
router.post("/post/comment", createComment);

module.exports = router;
