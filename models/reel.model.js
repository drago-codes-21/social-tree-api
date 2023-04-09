import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User id is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  extension: {
    type: String,
    required: [true],
    enum: ["mp4"],
  },
});

const Reel = mongoose.model("Reel", reelSchema);

export default Reel;
