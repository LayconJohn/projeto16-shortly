import { db } from "../database/db.js";

async function shortenUrl(url, shortUrl, userId) {
    return await db.query('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)', [url, shortUrl, userId]);
}

const urlRepository = {
    shortenUrl,
};

export default urlRepository;