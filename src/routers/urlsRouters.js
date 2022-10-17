import { Router } from "express";

import { shortenUrl, getUrlById, redirectUrl, deleteUrl } from "../controllers/urlsControllers.js";
import { validateUrl } from "../middlewares/schemasValidation.js";
import { checkToken } from "../middlewares/authMiddlewares.js";

const router = Router();

router.post("/urls/shorten",
    validateUrl,
    checkToken,
    shortenUrl);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", redirectUrl);
router.delete("/urls/:id", 
    checkToken,
    deleteUrl); 

export default router;