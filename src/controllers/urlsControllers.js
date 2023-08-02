import urlService from "../services/urlService.js";

async function shortenUrl(req, res) {
    const {url} = req.body;
    const session = res.locals.session;    
    try {
        const shortUrl = await urlService.shortenUrl(session.id, url);
        return res.status(201).send({shortUrl: `${shortUrl}`});
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    } 
}

async function getUrlById(req, res) {
    const {id} = req.params;
    const url = res.locals.url;
    try {
        const urlById = await urlService.getUrlById(url, id);
        return res.status(200).send(urlById);
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            return res.sendStatus(404);
        }
        return res.sendStatus(500);
    }
}

async function redirectUrl(req, res) {
    const url = res.locals.url;

    try {
        await urlService.redirectUrl(url);
        return res.redirect(url.url);
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function deleteUrl(req, res) {
    const {id} = req.params;
    const session = res.locals.session;
    const url = res.locals.url;
    try {
        if (url.userId !== session.userId) {
            return res.sendStatus(401);
        }
        await db.query('DELETE FROM urls WHERE id = $1', [id]);

        return res.sendStatus(204);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}


export {
    shortenUrl, 
    getUrlById,
    redirectUrl,
    deleteUrl,
};