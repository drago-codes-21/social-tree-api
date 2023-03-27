import express from "express";
import {
  getUser,
  getUserFriends,
  updateUser,
  deleteUser,
  addRemoveFriend,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get/:id", getUser);
router.get("/get/friends", getUserFriends);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.patch("/:id/:friendId", addRemoveFriend);

export default router;
