const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../db/queries');
const home = async (req, res) => {
  res.render('index', { title: 'Members Only' });
};
const signUpFormGET = (req, res) => {
  res.render('sign-up', { title: 'Sign Up' });
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

const logInFormGET = (req, res) => {
  res.render('login', { title: 'Log In' });
};

const createMessageGET = (req, res) => {
  res.render('newMessage', { title: 'Create Message' });
};

const createMessagePOST = async (req, res, next) => {
  const { title, text } = req.body;
  const { id } = req.user;
  try {
    await db.createMessage(title, text, id);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  home,
  signUpFormGET,
  signUpFormPOST,
  logInFormGET,
  createMessageGET,
  createMessagePOST,
};
