const pool = require('./pool');
const bcrypt = require('bcryptjs');

const createUser = async (fname, lname, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'insert into users (fname,lname,email,password) values ($1, $2, $3, $4)',
    [fname, lname, email, hashedPassword]
  );
};

module.exports = { createUser };
