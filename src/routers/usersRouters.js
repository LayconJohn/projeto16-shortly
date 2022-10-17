import { Router } from "express";

import { getUrlsByUser, getRanking } from "../controllers/usersControllers.js";
import { checkToken } from "../middlewares/authMiddlewares.js";
import { checkUser } from "../middlewares/userMiddlewares.js";

const router = Router();

router.get("/users/me", 
    checkToken,
    checkUser,
    getUrlsByUser);
router.get("/ranking", getRanking);

export default router;