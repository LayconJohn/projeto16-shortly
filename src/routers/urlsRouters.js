import { Router } from "express";

import { shortenUrl, getUrlById, redirectUrl, deleteUrl } from "../controllers/urlsControllers.js";
import { validateUrl } from "../middlewares/schemasValidation.js";
import { checkToken } from "../middlewares/authMiddlewares.js";
import { checkExistingUrl } from "../middlewares/urlsMiddlwwares.js";

const router = Router();

router.post("/urls/shorten",
    validateUrl,
    checkToken,
    shortenUrl);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", redirectUrl);
router.delete("/urls/:id", 
    checkToken,
    checkExistingUrl,
    deleteUrl); 

export default router;