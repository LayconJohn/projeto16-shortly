
function checkPassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(422).send("Os campos de senha e confirmar senha devem ser iguais.");
    }
    next();
}

export {
    checkPassword,

};