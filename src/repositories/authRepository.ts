import { db } from '../database/db.js';
import { User } from '../models/entity/userEntity.js';

async function login(user: User, token: string) {
    return await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.id, token]);
}

async function register(name: string, email: string, encryptedPassword: string) {
    return await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, encryptedPassword]);
}

const authRepository = {
    login,
    register,
};

export default authRepository;