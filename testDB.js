const pool = require('./db/pool');

async function testDB() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to database:', res.rows[0]);
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

testDB();
