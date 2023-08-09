import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import {urlSchema} from "../schemas/urlSchemas.js"

function validateUserSignUp(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const validation = signUpSchema.validate({name, email, password, confirmPassword}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        return res.status(422).send(errors);
    }
    next();
}

function validateUserSignIn(req, res, next) {
    const {email, password} = req.body;

    const validation = signInSchema.validate({email, password}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        return res.status(422).send(errors);
    }

    next();
}

function validateUrl(req, res, next) {
    const {url} = req.body;

    const validation = urlSchema.validate({url})
    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    } 
    next();
}

export {
    validateUserSignUp, 
    validateUserSignIn,
    validateUrl,
     
};