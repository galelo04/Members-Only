const isMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.status === 'member') {
    return next();
  }
  res.send('<h1>Unauthorized you are not a member</h1>');
};
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isadmin) {
    return next();
  }
  res.send('<h1>Unauthorized you are not an admin</h1>');
};
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send('<h1>Unauthorized you are not logged in</h1>');
};
module.exports = { isAdmin, isMember, isAuth };
