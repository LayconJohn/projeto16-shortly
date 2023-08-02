import { db } from "../database/db.js";

async function shortenUrl(url, shortUrl, userId) {
    return await db.query('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)', [url, shortUrl, userId]);
}

async function redirectUrl(url) {
    return await db.query('UPDATE urls SET "visitCount" = $1 WHERE id = $2', [(url.visitCount + 1), url.id]);
}

const urlRepository = {
    shortenUrl,
    redirectUrl,
};

export default urlRepository;