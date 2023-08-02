import authService from "../services/authService.js";

async function registerUser(req, res) {
    const { name, email, password } = req.body;
    try {
        await authService.register(name, email, password);
        return res.sendStatus(201)
    } catch (error) {
        return res.sendStatus(500);
    }
};

async function loginUser(req, res) {
    const user = res.locals.user;
    try {
        const token = await authService.login(user);
        return res.status(200).send({token: token});
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { registerUser, loginUser };