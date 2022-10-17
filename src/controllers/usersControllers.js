import { db } from "../database/db.js";

async function getUrlsByUser(req, res) {
    const user = res.locals.user;
    try {

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

async function getRanking(req, res) {
    try {
        const ranking = (await db.query(`
        SELECT
        users.id,
        users.name,
        COUNT(urls.id) AS "linksCount",
        SUM(urls."visitCount") AS "visitCount"
        FROM users
        JOIN urls ON users.id = urls."userId"
        GROUP BY users.id ORDER BY "visitCount" DESC
        LIMIT 10;        
        `)).rows;

        return res.status(200).send(ranking);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

export { getUrlsByUser, getRanking };