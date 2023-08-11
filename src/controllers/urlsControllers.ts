import { Request, Response } from "express";
import { CreateUrl } from "../models/dto/url/createUrlDto.js";
import { UrlDto } from "../models/dto/url/urlDto.js";
import { Session } from "../models/entity/sessionEntity.js";
import urlService from "../services/urlService.js";

async function shortenUrl(req: Request, res: Response) {
    const url = req.body as UrlDto;
    const session: Session = res.locals.session;    
    try {
        const shortUrl = await urlService.shortenUrl(session.id, url.url);
        return res.status(201).send({shortUrl: `${shortUrl}`});
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    } 
}

async function getUrlById(req: Request, res: Response) {
    const {id} = req.params;
    const url: UrlDto = res.locals.url;
    try {
        const urlById: UrlDto = await urlService.getUrlById(url, Number(id));
        return res.status(200).send(urlById);
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            return res.sendStatus(404);
        }
        return res.sendStatus(500);
    }
}

async function redirectUrl(req: Request, res: Response) {
    const url: UrlDto = res.locals.url;

    try {
        await urlService.redirectUrl(url);
        return res.redirect(url.url);
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function deleteUrl(req: Request, res: Response) {
    const {id} = req.params;
    const session: Session = res.locals.session;
    const url: UrlDto = res.locals.url;
    try {
        await urlService.deleteUrl(url, session, Number(id));
        return res.sendStatus(204);
    } catch (error) {
        if (error.message === "UNAUTHORIZED") {
            return res.sendStatus(401);
        }
        return res.sendStatus(500);
    }
}


export {
    shortenUrl, 
    getUrlById,
    redirectUrl,
    deleteUrl,
};