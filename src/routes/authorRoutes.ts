import express from "express";
import {
  signup,
  login,
  logout,
  getUserProfile,
  getAllAuthors,
  updateAuthorProfile,
} from "../controllers/authorContoller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", signup);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/profile/", protect, getUserProfile);
router.get("/", protect, getAllAuthors);
router.put("/updateAccount", protect, updateAuthorProfile);
router.delete("/delete/:id");

export default router;
