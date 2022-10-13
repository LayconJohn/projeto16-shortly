import { db } from "../database/db.js";

import { nanoid } from 'nanoid';

async function shortenUrl(req, res) {
    const {url} = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }
    const urlShort = nanoid(10);
    try {
        const session = (await db.query('SELECT * FROM sessions WHERE token = $1', [token])).rows[0];
        if (!session) {
            return res.sendStatus(401);
        }

        return res.status(201).send({shortUrl: `${process.env.DOMAIN}/${urlShort}`});
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
    
}

export {shortenUrl};