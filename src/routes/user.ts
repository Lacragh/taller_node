import express, { Request, Response } from "express";
import userController from '../controllers/user.controller';
import auth from '../middlewares/auth';
import userSchema from "../schemas/user.schema";
import validateSchema from "../middlewares/validateSchema";

export const router = express.Router();

router.post("/",auth,validateSchema(userSchema), userController.create);

router.get("/", userController.getAll);

router.post("/login", userController.login)

router.get("/profile", auth, userController.get);

router.get("/:id", userController.get);

router.put("/:id",auth, userController.update);

router.delete("/:id",auth, userController.delete);