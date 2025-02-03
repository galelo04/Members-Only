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
  host: PGHOST, // or wherever the db is hosted
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});
