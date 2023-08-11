import joi from "joi";
import { CreateUser } from "../dto/user/createUserDto";
import { LoginUserDto } from "../dto/user/loginUserDto";


const signUpSchema: joi.ObjectSchema<CreateUser> = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});


const signInSchema:  joi.ObjectSchema<LoginUserDto> = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export {signUpSchema, signInSchema};