import { db } from "../database/db.js";

import { nanoid } from 'nanoid';

async function shortenUrl(req, res) {
    const {url} = req.body;
    const session = res.locals.session;

    const shortUrl = nanoid(10);
    try {
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
    const url = res.locals.url;
    try {
        return res.status(200).send({
            id: url.id,
            shortUrl: url.shortUrl,
            url: url.url
        });
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

async function redirectUrl(req, res) {
    const url = res.locals.url;

    try {
        await db.query('UPDATE urls SET "visitCount" = $1 WHERE id = $2', [(url.visitCount + 1), url.id]);
        return res.redirect(url.url);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

async function deleteUrl(req, res) {
    const {id} = req.params;
    const session = res.locals.session;
    const url = res.locals.url;
    try {
        if (url.userId !== session.userId) {
            return res.sendStatus(401);
        }
        await db.query('DELETE FROM urls WHERE id = $1', [id]);

        return res.sendStatus(204);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}


export {
    shortenUrl, 
    getUrlById,
    redirectUrl,
    deleteUrl,
};