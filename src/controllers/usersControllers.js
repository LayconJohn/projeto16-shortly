import userService from "../services/userService.js";

async function getUrlsByUser(req, res) {
    const user = res.locals.user;
    try {
        const body = await userService(user);
        return res.status(200).send(body);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

async function getRanking(req, res) {
    try {
        const ranking = await userService.getRanking();
        return res.status(200).send(ranking);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

export { getUrlsByUser, getRanking };