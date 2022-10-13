import pg from 'pg';

const { Pool } = pg;

const db = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: '5432',
    database: 'shortly'
});

export { db };