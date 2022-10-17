import { signUpSchema } from "../schemas/authSchemas";

function validateUserSignUp(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const validation = signUpSchema.validate({name, email, password, confirmPassword}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        return res.status(422).send(errors);
    }
    next();
}

export {validateUserSignUp};