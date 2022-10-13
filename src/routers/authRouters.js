import { Router } from "express";

import { registerUser, loginUser } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);

export default router;