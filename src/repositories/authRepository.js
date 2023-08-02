import { db } from '../database/db.js';

async function login(user, token) {
    await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.id, token]);
}

const authRepository = {
    login,
};

export default authRepository;