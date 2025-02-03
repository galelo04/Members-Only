const { validationResult, body } = require('express-validator');

const signupValidationRules = [
  body('fname')
    .escape()
    .trim()
    .isAlpha()
    .withMessage('First name must contain only letters.')
    .isLength({ min: 1, max: 20 })
    .withMessage('First name must be between 1 and 20 characters.'),

  body('lname')
    .escape()
    .trim()
    .isAlpha()
    .withMessage('Last name must contain only letters.')
    .isLength({ min: 1, max: 20 })
    .withMessage('Last name must be between 1 and 20 characters.'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
];

const validateSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    field: err.param,
    message: err.msg,
  }));

  return res.status(400).render('signup', {
    title: 'Sign Up',
    errors: extractedErrors,
  });
};

const loginValidationRules = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address.'),
];

const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    field: err.param,
    message: err.msg,
  }));

  return res.status(400).render('login', {
    title: 'Log In',
    errors: extractedErrors,
  });
};

const messageValidationRules = [
  body('title')
    .isLength({ min: 1, max: 50 })
    .escape()
    .withMessage('Title must be between 1 and 50 characters.'),

  body('text')
    .isLength({ min: 1, max: 255 })
    .escape()
    .withMessage('Text must be between 1 and 255 characters.'),
];

const validateMessage = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    field: err.param,
    message: err.msg,
  }));

  return res.status(400).render('newMessage', {
    title: 'Create Message',
    errors: extractedErrors,
  });
};

const validateUpdateMessage = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    field: err.param,
    message: err.msg,
  }));

  return res.status(400).render('updateMessage', {
    title: 'Update Message',
    errors: extractedErrors,
  });
};

module.exports = {
  signupValidationRules,
  validateSignup,
  loginValidationRules,
  validateLogin,
  messageValidationRules,
  validateMessage,
  validateUpdateMessage,
};
