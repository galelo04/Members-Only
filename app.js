const path = require('node:path');
const passport = require('passport');
const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const pgSession = require('connect-pg-simple')(expressSession);

const app = express();

// config view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session config

app.use(
  session({
    secret: 'members only',
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: pool, // Connection pool
      tableName: 'sessions', // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/sign-up', (req, res) => res.render('sign-up-form'));

app.post('/sign-up', async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query('insert into users (username, password) values ($1, $2)', [
      req.body.username,
      hashedPassword,
    ]);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
});
app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);
app.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.listen(3000, () => console.log('app listening on port 3000!'));
