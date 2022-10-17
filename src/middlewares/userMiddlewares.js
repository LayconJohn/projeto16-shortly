import {db} from "../database/db.js";

async function checkUser(req, res, next) {
    const session = res.locals.session;
    try {
        const user = (await db.query('SELECT * FROM users WHERE id = $1', [session.userId])).rows[0];
        if (!user) {
            return res.sendStatus(404);
        }
        res.locals.user = user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

export {checkUser};