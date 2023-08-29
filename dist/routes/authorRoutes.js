"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorContoller_1 = require("../controllers/authorContoller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authorContoller_1.signup);
router.post("/login", authorContoller_1.login);
router.post("/logout", authMiddleware_1.protect, authorContoller_1.logout);
router.get("/profile/", authMiddleware_1.protect, authorContoller_1.getUserProfile);
router.get("/", authMiddleware_1.protect, authorContoller_1.getAllAuthors);
router.put("/updateAccount", authMiddleware_1.protect, authorContoller_1.updateAuthorProfile);
router.delete("/delete/:id");
exports.default = router;
