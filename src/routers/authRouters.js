import { Router } from "express";

import { checkPassword, checkExistingUser } from "../middlewares/authMiddlewares.js";
import { validateUserSignUp } from "../middlewares/schemasValidation.js";
import { registerUser, loginUser } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", 
    checkPassword, 
    validateUserSignUp,
    checkExistingUser,
    registerUser);
router.post("/signin", loginUser);

export default router;