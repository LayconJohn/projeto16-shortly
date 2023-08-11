import { db } from '../database/db.js';
import { User } from '../models/entity/userEntity.js';

async function getUrlsByUser(user: User) {
    return (await db.query('SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1', [user.id])).rows;
}

async function getRanking() {
    return (await db.query(`
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
}

const userRepository = {
    getUrlsByUser,
    getRanking,
};

export default userRepository;