import { NextFunction, Request, Response } from "express";
import { Session } from "../models/entity/sessionEntity";
import {db} from "../database/db.js";

async function checkUser(req: Request, res: Response, next: NextFunction) {
    const session: Session = res.locals.session;
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