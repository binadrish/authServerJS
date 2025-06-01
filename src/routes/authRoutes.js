import { Router } from "express";
const router = Router();
import { loginController } from "../controllers/authController.js";

router.get("/login",loginController);
// router.post("/register", register);

export default router;