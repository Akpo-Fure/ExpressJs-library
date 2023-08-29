"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bookController_1 = require("../controllers/bookController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.get("/", bookController_1.getBooks);
router.post("/", authMiddleware_1.protect, bookController_1.addBook);
router.get("/:id", bookController_1.getBookById);
router.delete("/delete/:id", authMiddleware_1.protect, bookController_1.deleteBook);
router.put("/update/:id", authMiddleware_1.protect, bookController_1.updateBook);
exports.default = router;
