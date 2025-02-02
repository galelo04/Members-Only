const { Pool } = require('pg');
require('dotenv').config();
const { USER, HOST, PORT, PASSWORD, DATABASE } = process.env;

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: HOST, // or wherever the db is hosted
  user: USER,
  database: DATABASE,
  password: PASSWORD,
  port: PORT, // The default port
});
