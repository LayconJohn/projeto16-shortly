import { Router } from "express";

import { checkPassword } from "../middlewares/authMiddlewares.js";
import { registerUser, loginUser } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", checkPassword, registerUser);
router.post("/signin", loginUser);

export default router;