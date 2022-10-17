import pg from 'pg';

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = new Pool(databaseConfig);
/*const db = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database:'shortly'
  });
*/

export { db };