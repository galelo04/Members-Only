const pool = require('./pool');
const bcrypt = require('bcryptjs');

const createUser = async (fname, lname, email, password, isAdmin) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'insert into users (fname,lname,email,password,isAdmin) values ($1, $2, $3, $4, $5)',
    [fname, lname, email, hashedPassword, isAdmin]
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

const getMessages = async () => {
  const { rows } =
    await pool.query(`SELECT title , text ,timestamp,messages.id , CONCAT(fname ,' ',lname) as author FROM users
    JOIN messages ON users.id = messages.user_id
    ORDER BY timestamp DESC`);
  return rows;
};

const getMessageById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
    id,
  ]);
  return rows[0];
};

const updateMessage = async (title, text, id) => {
  await pool.query('UPDATE messages SET title = $1, text = $2 WHERE id = $3', [
    title,
    text,
    id,
  ]);
};

const deleteMessage = async (id) => {
  await pool.query('DELETE FROM messages WHERE id = $1', [id]);
};

const makeMember = async (id) => {
  await pool.query('UPDATE users SET status = $1 WHERE id = $2', [
    'member',
    id,
  ]);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  makeMember,
};
