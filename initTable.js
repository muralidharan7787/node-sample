// initDb.js
const pool = require('./db');

const createTableAndInsert = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      );
    `);

    await pool.query(`
      INSERT INTO users (name, email) VALUES
      ('Alice', 'alice@example.com'),
      ('Bob', 'bob@example.com');
    `);

    console.log("✅ Table created and data inserted");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    pool.end();
  }
};

createTableAndInsert();
