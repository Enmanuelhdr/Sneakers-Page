exports.Get404 =  (req, res, next) => {
    res.status(404).render("templates/error",{pageTitle: "404 Page"});
  };