import mysql from 'mysql2/promise';
import config from '../db_config.js';

async function query(sql, values) {
    try {
        const connection = await mysql.createConnection(config.DB);
        const [rows, fields] = await connection.execute(sql, values);

        // disconnect from the database
        connection.end();

        // requested was found in the database
        if (Array.isArray(rows) && rows.length) { return rows; }

        // requested was not found in the database
        return null;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default query;
