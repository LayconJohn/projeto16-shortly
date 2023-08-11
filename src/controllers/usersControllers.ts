import { Request, Response } from "express";
import { User } from "../models/entity/userEntity.js";
import userService from "../services/userService.js";

async function getUrlsByUser(req: Request, res: Response) {
    const user = res.locals.user as User;
    try {
        const body = await userService.getUrlsByUser(user);
        return res.status(200).send(body);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

async function getRanking(req: Request, res: Response) {
    try {
        const ranking = await userService.getRanking();
        return res.status(200).send(ranking);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { getUrlsByUser, getRanking };