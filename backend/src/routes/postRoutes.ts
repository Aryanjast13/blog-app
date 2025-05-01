import express, { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../utils/uploadToS3.js";
const postRoutes: Router = express.Router();

postRoutes.post("/", authMiddleware, upload.single("image"), createPost);

postRoutes.get("/", getAllPosts);
postRoutes.get("/:id", getPost);

postRoutes.put("/:id", authMiddleware, updatePost);

postRoutes.delete("/:id", authMiddleware, deletePost);

export default postRoutes;
