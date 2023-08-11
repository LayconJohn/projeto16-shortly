import { db } from "../database/db.js";
import { UrlDto } from "../models/dto/url/urlDto.js";

async function shortenUrl(url: string, shortUrl: string, userId: number) {
    await db.query('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)', [url, shortUrl, userId]);
}

async function redirectUrl(url: UrlDto) {
    await db.query('UPDATE urls SET "visitCount" = $1 WHERE id = $2', [(url.visitCount + 1), url.id]);
}

async function deleteUrl(id: number) {
    await db.query('DELETE FROM urls WHERE id = $1', [id]);
}

const urlRepository = {
    shortenUrl,
    redirectUrl,
    deleteUrl,
};

export default urlRepository;