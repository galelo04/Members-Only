const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../db/queries');
const home = async (req, res) => {
  const messages = await db.getMessages();
  console.log(req.user);
  res.render('index', { title: 'Members Only', messages });
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
      req.body.password,
      req.body.isAdmin
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

const updateMessageGET = async (req, res, next) => {
  const { id } = req.params;
  const message = await db.getMessageById(id);
  res.render('updateMessage', { title: 'Update Message', message });
};

const updateMessagePOST = async (req, res, next) => {
  const { title, text } = req.body;
  const { id } = req.params;
  try {
    await db.updateMessage(title, text, id);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

const deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.deleteMessage(id);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

const membershipGET = (req, res) => {
  res.render('membership', { title: 'Membership' });
};

const membershipPOST = async (req, res, next) => {
  const { secretPassword } = req.body;
  if (secretPassword === process.env.SECRET_PASSWORD) {
    await db.makeMember(req.user.id);
    res.redirect('/');
  } else {
    res.redirect('/membership');
  }
};

module.exports = {
  home,
  signUpFormGET,
  signUpFormPOST,
  logInFormGET,
  createMessageGET,
  createMessagePOST,
  updateMessageGET,
  updateMessagePOST,
  deleteMessage,
  membershipGET,
  membershipPOST,
};
