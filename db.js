// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',      // your MySQL username
  password: 'UrvhzRQVwWNocgXuGJZhHowmIllMDEJO',      // your MySQL password
  database: 'railway' // your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL DB');
});

module.exports = connection;
