const { Pool } = require('pg');
require('dotenv').config();
const {
  USER,
  HOST,
  PORT,
  PASSWORD,
  DATABASE,
  PGHOST,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
} = process.env;

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});
