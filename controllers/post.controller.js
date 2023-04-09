import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description: description,
      userPicturePath: user.picturePath,
      picturePath: picturePath,
      likes: new Map(),
      comments: [],
    });
    newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* READ */
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    post.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userID, comment } = req.body;
    const post = await Post.findOne({ _id: id });
    const comments_array = post.comments;

    comments_array.push({ user: userID, comment: comment });

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: comments_array },
      { new: true }
    );
    console.log(updatedPost.comments);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const toggleBookmarkPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);
    const bookmarkArr = user.bookmarks;
    const arr = [];
    // for(let i = 0; i < bookmarkArr.length; i++) {
    //   if(bookmarkArr[i] === postId) {
    //     bookmarkArr.
    //   }
    // }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bookmarks: bookmarkArr },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createPost,
  likePost,
  getFeedPosts,
  getSinglePost,
  getUserPosts,
  commentOnPost,
  toggleBookmarkPost,
};
