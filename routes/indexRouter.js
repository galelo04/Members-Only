const indexController = require('../controllers/indexController');

const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', indexController.home);
indexRouter.get('/sign-up', indexController.signUpFormGET);
indexRouter.post('/sign-up', indexController.signUpFormPOST);

// router.get('/sign-up', (req, res) => res.render('sign-up-form'));

// router.post('/sign-up', async (req, res, next) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     await pool.query('insert into users (username, password) values ($1, $2)', [
//       req.body.username,
//       hashedPassword,
//     ]);
//     res.redirect('/');
//   } catch (err) {
//     return next(err);
//   }
// });
// router.post(
//   '/log-in',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/',
//   })
// );
// router.get('/log-out', (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });
module.exports = indexRouter;
