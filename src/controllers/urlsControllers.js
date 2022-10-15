import { db } from "../database/db.js";

import { nanoid } from 'nanoid';

import {urlSchema} from "../schemas/urlSchemas.js";

async function shortenUrl(req, res) {
    const {url} = req.body;

    const validation = urlSchema.validate({url})
    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    } 

    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }
    const shortUrl = nanoid(10);
    try {
        const session = (await db.query('SELECT * FROM sessions WHERE token = $1', [token])).rows[0];
        if (!session) {
            return res.sendStatus(401);
        }

        await db.query('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)', [url, shortUrl, session.userId]);

        return res.status(201).send({shortUrl: `${shortUrl}`});
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
    
}

async function getUrlById(req, res) {
    const {id} = req.params;
    if (!id) {
        return res.sendStatus(404);
    }
    try {
        const url = (await db.query('SELECT id, "shortUrl", url FROM urls WHERE id = $1', [id])).rows[0];
        if (!url) {
            return res.sendStatus(404);
        }
        
        return res.status(200).send(url);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

async function redirectUrl(req, res) {
    const {shortUrl} = req.params;

    try {
        const url = (await db.query('SELECT * FROM urls WHERE "shortUrl" = $1', [shortUrl])).rows[0];
        if (!url) {
            return res.sendStatus(404);
        }

        await db.query('UPDATE urls SET "visitCount" = $1 WHERE id = $2', [(url.visitCount + 1), url.id]);
        console.log(url);
        return res.redirect(url.url);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

export {
    shortenUrl, 
    getUrlById,
    redirectUrl
};