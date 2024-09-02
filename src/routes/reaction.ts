import express from "express";
import ReactionController from "../controllers/reaction.controller";
import auth from "../middlewares/auth";

export const router = express.Router();

router.post("/", auth, ReactionController.create);

router.get("/:commentId", auth, ReactionController.getByComment);

router.delete("/:commentId", auth, ReactionController.delete);