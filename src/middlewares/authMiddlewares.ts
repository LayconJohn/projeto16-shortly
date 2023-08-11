import {db} from "../database/db.js";
import bcrypt from "bcrypt";
import { LoginUserDto } from "../models/dto/user/loginUserDto.js";

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
    const {email, password} = req.body as LoginUserDto;

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

async function checkToken(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = (await db.query('SELECT * FROM sessions WHERE token = $1', [token])).rows[0];
        if (!session) {
            return res.sendStatus(401);
        }
        res.locals.session = session;
        next();
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

export {
    checkPassword,
    checkExistingUser,
    checkLoginUser,
    checkToken,
};