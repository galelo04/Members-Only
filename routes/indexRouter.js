const passport = require('passport');
const indexController = require('../controllers/indexController');

const { Router } = require('express');
const { isMember, isAdmin, isAuth } = require('../middlewares/authentication');
const {
  validateSignup,
  validateLogin,
  validateMessage,
  validateUpdateMessage,
  signupValidationRules,
  loginValidationRules,
  messageValidationRules,
} = require('../middlewares/validate');
const indexRouter = Router();

indexRouter.get('/', indexController.home);
indexRouter.get('/sign-up', indexController.signUpFormGET);
indexRouter.post(
  '/sign-up',
  signupValidationRules,
  validateSignup,
  indexController.signUpFormPOST
);

indexRouter.get('/login', indexController.logInFormGET);
indexRouter.post(
  '/login',
  loginValidationRules,
  validateLogin,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

indexRouter.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

indexRouter.get('/new-message', isMember, indexController.createMessageGET);
indexRouter.post(
  '/new-message',
  messageValidationRules,
  validateMessage,
  isMember,
  indexController.createMessagePOST
);

indexRouter.get(
  '/update-message/:id',
  isAdmin,
  indexController.updateMessageGET
);
indexRouter.post(
  '/update-message/:id',
  messageValidationRules,
  validateUpdateMessage,
  isAdmin,
  indexController.updateMessagePOST
);

indexRouter.post('/delete-message/:id', isAdmin, indexController.deleteMessage);

indexRouter.get('/membership', isAuth, indexController.membershipGET);
indexRouter.post('/membership', isAuth, indexController.membershipPOST);
module.exports = indexRouter;
