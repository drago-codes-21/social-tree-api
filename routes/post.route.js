import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  commentOnPost,
} from "../controllers/post.controller.js";

const router = express.Router();

// router.post("/create", createPost);
router.get("/fetch", getFeedPosts);
router.get("/fetch/:userId", getUserPosts);
router.patch("/like/:id", likePost);
router.patch("/comment/:id", commentOnPost);

export default router;
