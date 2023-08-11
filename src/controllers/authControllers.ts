import { CreateUser } from "../models/dto/user/createUserDto.js";
import { LoginUserDto } from "../models/dto/user/loginUserDto.js";
import authService from "../services/authService.js";
import { Request, Response } from "express";

async function registerUser(req: Request, res: Response) {
    const { name, email, password } = req.body as CreateUser;
    try {
        await authService.register(name, email, password);
        return res.sendStatus(201)
    } catch (error) {
        return res.sendStatus(500);
    }
};

async function loginUser(req: Request, res: Response) {
    const user = res.locals.user as LoginUserDto;
    try {
        const token = await authService.login(user);
        return res.status(200).send({token: token});
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { registerUser, loginUser };