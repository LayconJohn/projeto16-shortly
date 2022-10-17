import { db } from "../database/db.js";

import { nanoid } from 'nanoid';

async function shortenUrl(req, res) {
    const {url} = req.body;

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


    try {

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


export {
    shortenUrl, 
    getUrlById,
    redirectUrl,
    deleteUrl,
};