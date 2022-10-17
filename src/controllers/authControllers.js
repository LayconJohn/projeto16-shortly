import { db } from '../database/db.js';
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { signInSchema} from "../schemas/authSchemas.js";

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
    const {email, password} = req.body;

    const validation = signInSchema.validate({email, password}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const user = (await db.query('SELECT * FROM users WHERE email = $1', [email])).rows[0];
        console.log()
        const passwordIsCorrect = bcrypt.compareSync(password, user.password);
        if (user && passwordIsCorrect) {
            const token = uuid();

            await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.id, token]);

            return res.status(200).send({token: token});
        }

        return res.status(401).send("Usuário ou senha inválido")

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
}

export { registerUser, loginUser };