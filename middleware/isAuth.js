exports.isAuth = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect("/login");
    }
    next();
};

exports.Auth = (req, res, next) => {
    if (!req.session) {
        return next();
      }
    if (req.session.isLoggedIn) {
        res.redirect("/");
    }
    next();
};
