const { Client } = require('pg');
require('dotenv').config();
const { USER, HOST, PORT, PASSWORD, DATABASE } = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  status varchar(50) NOT NULL DEFAULT 'not authorized',
  isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  text TEXT NOT NULL,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    host: HOST, // or wherever the db is hosted
    user: USER,
    database: DATABASE,
    password: PASSWORD,
    port: PORT, // The default port
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
