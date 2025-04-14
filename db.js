// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://root:kCBuMhyQpnu2uacBpPCwgtDuuTuhN38v@dpg-cvubgchr0fns73fvqj6g-a.oregon-postgres.render.com/test_kl8i',
  ssl: {
    rejectUnauthorized: false // required for Render
  }
});

module.exports = pool;
