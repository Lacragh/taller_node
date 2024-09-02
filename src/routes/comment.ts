import express from "express";
import CommentController from "../controllers/comment.controller";
import auth from "../middlewares/auth";

export const router = express.Router();

router.post("/", auth, CommentController.create);

router.get("/", auth, CommentController.getAll);

router.get("/:id", auth, CommentController.get);

router.get("/parent/:parentId", auth, CommentController.getByParentId);

router.put("/:id", auth, CommentController.update);

router.delete("/:id", auth, CommentController.delete);