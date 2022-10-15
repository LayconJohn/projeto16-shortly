import { Router } from "express";

import { shortenUrl, getUrlById, redirectUrl } from "../controllers/urlsControllers.js";

const router = Router();

router.post("/urls/shorten", shortenUrl);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", redirectUrl);

export default router;