const passport = require('passport');
const indexController = require('../controllers/indexController');

const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', indexController.home);
indexRouter.get('/sign-up', indexController.signUpFormGET);
indexRouter.post('/sign-up', indexController.signUpFormPOST);

indexRouter.get('/login', indexController.logInFormGET);
indexRouter.post(
  '/login',
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

indexRouter.get('/new-message', indexController.createMessageGET);
indexRouter.post('/new-message', indexController.createMessagePOST);

indexRouter.get('/update-message/:id', indexController.updateMessageGET);
indexRouter.post('/update-message/:id', indexController.updateMessagePOST);

indexRouter.post('/delete-message/:id', indexController.deleteMessage);
module.exports = indexRouter;
