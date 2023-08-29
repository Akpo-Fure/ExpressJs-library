import express from "express";
const router = express.Router();
import {
  addBook,
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
} from "../controllers/bookController";
import { protect } from "../middleware/authMiddleware";

router.get("/", getBooks);
router.post("/", protect, addBook);
router.get("/:id", getBookById);
router.delete("/delete/:id", protect, deleteBook);
router.put("/update/:id", protect, updateBook);

export default router;
