import mysql from "mysql2/promise";

const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "blog",
        waitForConnections: true,
        connectionLimit: 15,
        timezone: 'Z'
});

await pool.query(`
        CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                username VARCHAR(30) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
`);

await pool.query(`
        CREATE TABLE IF NOT EXISTS Posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author INT NOT NULL,
                content TEXT,
                cover_image VARCHAR(2083), -- S3 URLs can be long
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (author) REFERENCES Users(id) ON DELETE CASCADE
        )
`);

export default pool;
