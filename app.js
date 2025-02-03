const path = require('node:path');
const passport = require('passport');
const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('./db/pool');
const session = require('express-session');
const indexRouter = require('./routes/indexRouter');
const e = require('express');

const pgSession = require('connect-pg-simple')(session);

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
      pool: pool,
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
require('./config/passport');

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use(indexRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('app listening on port 3000!'));
