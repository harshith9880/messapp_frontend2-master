import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'Harshith',
  password: process.env.MYSQL_PASSWORD || 'India2018$',
  database: process.env.MYSQL_DATABASE || 'mess_app',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306
});

// Test the connection and create table if it doesn't exist
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Connected Successfully!");

    // Create table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS feed1 (
        id INT AUTO_INCREMENT PRIMARY KEY,
        regNo VARCHAR(20) NOT NULL,
        name VARCHAR(100) NOT NULL,
        block VARCHAR(50) NOT NULL,
        room VARCHAR(20) NOT NULL,
        messName VARCHAR(100) NOT NULL,
        messType ENUM('Veg', 'Non-Veg', 'Special', 'Night Mess') NOT NULL,
        category ENUM('Quality', 'Quantity', 'Hygiene', 'Mess Timing') NOT NULL,
        feedbackType ENUM('Suggestion', 'Complaint', 'Appreciation') NOT NULL,
        comments TEXT NOT NULL,
        proof_path VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✅ Database table verified/created!");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection/Setup Error:", error);
  }
})();

export default pool;
