async function checkExistingUrl(req, res, next) {
    const {id} = req.params;

    try {
        const url = (await db.query('SELECT * FROM urls WHERE id = $1', [id])).rows[0];
        if (!url) {
            return res.sendStatus(404);
        }
        res.locals.url = url;
        next();
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(500);
    }
}

export {checkExistingUrl};