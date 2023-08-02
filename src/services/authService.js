import { v4 as uuid } from "uuid";
import authRepository from "../repositories/authRepository.js";

async function login(user) {
    const token = uuid();
    await authRepository.login(user, token);
    return token;
}

const authService = {
    login,
};

export default authService;