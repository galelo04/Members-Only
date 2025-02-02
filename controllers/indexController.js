const bcrypt = require('bcryptjs');
const db = require('../db/queries');
const home = async (req, res) => {
  res.render('index', { title: 'Members Only' });
};
const signUpFormGET = (req, res) => {
  res.render('signup', { title: 'Sign Up' });
};
const signUpFormPOST = async (req, res, next) => {
  try {
    await db.createUser(
      req.body.fname,
      req.body.lname,
      req.body.email,
      req.body.password
    );
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

module.exports = { home, signUpFormGET, signUpFormPOST };
