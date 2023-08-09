import { db } from '../database/db.js';

async function login(user, token) {
    return await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.id, token]);
}

async function register(name, email, encryptedPassword) {
    return await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, encryptedPassword]);
}

const authRepository = {
    login,
    register,
};

export default authRepository;