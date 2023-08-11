import { v4 as uuid } from "uuid";
import authRepository from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import { User } from "../models/entity/userEntity.js";

async function login(user: User) {
    const token = uuid();
    await authRepository.login(user, token);
    return token;
}

async function register(name: string, email: string, password: string) {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    return await authRepository.register(name, email, encryptedPassword);
}

const authService = {
    login,
    register,
};

export default authService;