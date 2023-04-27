import * as dotenv from "dotenv";
dotenv.config();

const config = {
    DB: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectionLimit: 10
    }
};

export default config;
