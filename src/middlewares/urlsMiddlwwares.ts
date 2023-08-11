import {db} from "../database/db.js"
import { UrlDto } from "../models/dto/url/urlDto.js";

async function checkExistingUrl(req, res, next) {
    const {id} = req.params;

    try {
        const url = (await db.query('SELECT * FROM urls WHERE id = $1', [id])).rows[0];
        if (!url) {
            return res.sendStatus(404);
        }
        res.locals.url = url as UrlDto;
        next();
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

async function checkExistingUrlByShorUrl(req, res, next) {
    const {shortUrl} = req.params;

    try {
        const url = (await db.query('SELECT * FROM urls WHERE "shortUrl" = $1', [shortUrl])).rows[0];
        if (!url) {
            return res.sendStatus(404);
        }
        res.locals.url = url;
        next();
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

export {checkExistingUrl, checkExistingUrlByShorUrl};