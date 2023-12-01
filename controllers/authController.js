const User = require("../models/auth/User");
const bcrypt = require("bcryptjs");
const generartoken = require("../helpers/token")


exports.GetSignUp = (req, res, next) => {
  res.render("auth/signUp", {
    pageTitle: "Sign Up",
    signUpActive: true,
    headerBar: false,
    footerBar: false
  });
};

exports.PostSignUp = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  // const profilePicture = req.files.profilePicture;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const phone = req.body.phone;
  const gender = req.body.gender;

  if (password !== confirmPassword) {
    req.flash("errors", "The password doesn't match");
    return res.redirect("/contrasena");
  }

  try {
    const result = await User.findOne({ where: { email } });
    if (result) {
      req.flash("errors", "This email is taken, try another.");
      return res.redirect("/correo");
    }
  } catch (err) {
    console.log(err);
    req.flash("errors", "An error has occurred. Contact the administrator");
    return res.redirect("/eploto");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      firstName,
      lastName,
      // imagePath: "/" + profilePicture[0].path,
      dateOfBirth,
      email,
      password: hashedPassword,
      phone,
      gender,
    });
  } catch (err) {
    console.log(err);
    req.flash("errors", "An error has occurred. Contact the administrator");
    return res.redirect("/");
  }
};

exports.GetLogin = (req, res, next) => {
  res.render("auth/Login", {
    pageTitle: "Login",
    loginActive: true,
    headerBar: false,
    footerBar: false
  });
};

exports.PostLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      req.flash("errors", "Invalid Login, Please try again.");
      return res.redirect("/nocorreo");
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      req.session.isLoggedIn = true;
      req.session.user = user;

      // Crear token al iniciar sesion
      return req.session.save((err) => {
        if (err) {
          console.error("Error al guardar la sesión:", err);
          res.status(500).send("Error interno del servidor");
          return;
        }
      
        const oneHourInMilliseconds = 3600000;
        const token = generartoken({ id: user.id, firstName: user.firstName })
      
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + oneHourInMilliseconds),
        });
        console.log('Entrando');
        console.log(token);
        res.redirect("/adentroo");
      });
    }
    req.flash("errors", "Invalid Login, Please try again.");
    res.redirect("/error1");
  } catch (err) {
    console.log(err);
    req.flash("errors", "An error has occurred. Contact the administrator");
    return res.redirect("/error2");
  }
};

exports.PostLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.GetSite = (req, res, next) => {
  res.render("auth/site", {
    pageTitle: "Sneaker Page",
    siteActive: true,
    headerBar: true,
    footerBar: true
  });
};
