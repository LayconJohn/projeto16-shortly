import {db} from "../database/db.js";
import bcrypt from "bcrypt";

function checkPassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(422).send("Os campos de senha e confirmar senha devem ser iguais.");
    }
    next();
}

async function checkExistingUser(req, res, next) {
    const { email } = req.body;
    try {
        const user = (await db.query('SELECT * FROM users WHERE email = $1', [email]));
        if (user.rows[0]) {
            return res.sendStatus(409);
        }
        next();
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

async function checkLoginUser(req, res, next) {
    const {email, password} = req.body;

    try {
        const user = (await db.query('SELECT * FROM users WHERE email = $1', [email])).rows[0];
        const passwordIsCorrect = bcrypt.compareSync(password, user.password);

        if(user && passwordIsCorrect) {
            res.locals.user = user;
            return next();
        }
        return res.status(401).send("Usuário ou senha inválido");
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }

}

export {
    checkPassword,
    checkExistingUser,
    checkLoginUser,
};