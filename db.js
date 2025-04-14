// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // your MySQL username
  password: '',      // your MySQL password
  database: 'test' // your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL DB');
});

module.exports = connection;
