import { CreateUser } from "../models/dto/user/createUserDto.js";
import { LoginUserDto } from "../models/dto/user/loginUserDto.js";
import { signUpSchema, signInSchema } from "../models/schemas/authSchemas.js";
import {urlSchema} from "../models/schemas/urlSchemas.js"
import { NextFunction, Request, Response } from "express";

function validateUserSignUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, confirmPassword } = req.body as CreateUser;
    const validation = signUpSchema.validate({name, email, password, confirmPassword}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        return res.status(422).send(errors);
    }
    next();
}

function validateUserSignIn(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body as LoginUserDto;

    const validation = signInSchema.validate({email, password}, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        return res.status(422).send(errors);
    }

    next();
}

function validateUrl(req: Request, res: Response, next: NextFunction) {
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