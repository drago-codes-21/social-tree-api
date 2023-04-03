import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    picturePath: {
      type: String,
      required: true,
    },
    userProfilePath: {
      type: String,
    },
    likes: {
      type: Map,
    },
    comments: {
      type: Array,
      default: [{}],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
