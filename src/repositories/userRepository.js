import { db } from '../database/db.js';

async function getUrlsByUser(user) {
    return (await db.query('SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1', [user.id])).rows;
}

const userRepository = {
    getUrlsByUser,
};

export default userRepository;