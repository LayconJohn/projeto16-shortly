import { db } from '../database/db.js';

import { v4 as uuid } from "uuid";

async function registerUser(req, res) {
    const { name, email, password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);
    try {

        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, encryptedPassword]);
        return res.sendStatus(201)
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};

async function loginUser(req, res) {
    const user = res.locals.user;
    try {
        const token = uuid();
        await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.id, token]);

        return res.status(200).send({token: token});

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
}

export { registerUser, loginUser };