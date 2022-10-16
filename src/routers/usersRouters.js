import { Router } from "express";

import { getUrlsByUser, getRanking } from "../controllers/usersControllers.js";

const router = Router();

router.get("/users/me", getUrlsByUser);
router.get("/ranking", getRanking);

export default router;