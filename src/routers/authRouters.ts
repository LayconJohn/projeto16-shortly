import { Router } from "express";

import { checkPassword, checkExistingUser, checkLoginUser } from "../middlewares/authMiddlewares.js";
import { validateUserSignUp, validateUserSignIn } from "../middlewares/schemasValidation.js";
import { registerUser, loginUser } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", 
    checkPassword, 
    validateUserSignUp,
    checkExistingUser,
    registerUser);
router.post("/signin", 
    validateUserSignIn,
    checkLoginUser,    
    loginUser);

export default router;