import { Router } from "express";

import { getUrlsByUser } from "../controllers/urlsControllers.js";

const router = Router();

router.get("/users/me", getUrlsByUser);

export default router;