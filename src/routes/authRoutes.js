import { Router } from "express";
const router = Router();
import { loginController, registerController } from "../controllers/authController.js";

router.get("/login",loginController);
router.post("/register", registerController);

export default router;