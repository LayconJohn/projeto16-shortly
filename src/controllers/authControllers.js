import authService from "../services/authService.js";

async function registerUser(req, res) {
    const { name, email, password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);
    try {

        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, encryptedPassword]);
        return res.sendStatus(201)
    } catch (error) {
        console.log(error.message);
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