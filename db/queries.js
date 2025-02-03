const pool = require('./pool');
const bcrypt = require('bcryptjs');

const createUser = async (fname, lname, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'insert into users (fname,lname,email,password) values ($1, $2, $3, $4)',
    [fname, lname, email, hashedPassword]
  );
};

const getUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  return rows[0];
};

const getUserById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
};

const createMessage = async (title, text, user_id) => {
  await pool.query(
    'insert into messages (title, text, user_id) values ($1, $2, $3)',
    [title, text, user_id]
  );
};

module.exports = { createUser, getUserByEmail, getUserById, createMessage };
