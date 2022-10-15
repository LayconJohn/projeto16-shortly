import { Router } from "express";

import { shortenUrl, getUrlById, redirectUrl, deleteUrl, getUrlsByUser } from "../controllers/urlsControllers.js";

const router = Router();

router.post("/urls/shorten", shortenUrl);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", redirectUrl);
router.delete("/urls/:id", deleteUrl); 

export default router;