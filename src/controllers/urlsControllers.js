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

async function deleteUrl(req, res) {
    //id
    const {id} = req.params;

    //token
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        //verificar sessão
        const session = (await db.query('SELECT * FROM sessions WHERE token = $1', [token])).rows[0];
        if (!session) {
            return res.sendStatus(401);
        }

        //verificar url
        const url = (await db.query('SELECT * FROM urls WHERE id = $1', [id])).rows[0];
        if (!url) {
            return res.sendStatus(404);
        }

        //verificar se a url é do usuário
        if (url.userId !== session.userId) {
            return res.sendStatus(401);
        }
        //deletar url
        await db.query('DELETE FROM urls WHERE id = $1', [id]);

        return res.sendStatus(204);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

async function getUrlsByUser(req, res) {
    //token
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        //verificar sessão
        const session = (await db.query('SELECT * FROM sessions WHERE token = $1', [token])).rows[0];
        if (!session) {
            return res.sendStatus(401);
        }

        //verificar usuário
        const user = (await db.query('SELECT * FROM users WHERE id = $1', [session.userId])).rows[0];
        if (!user) {
            return res.sendStatus(404);
        }

        const urls = (await db.query('SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1', [user.id])).rows;
        let visitCount = 0;
        urls.map( url => visitCount += url.visitCount);
        const body = {
            id: user.id,
            name: user.name,
            visitCount: visitCount,
            shortenUrls: urls
        }
        return res.status(200).send(body);

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
    getUrlsByUser,
};