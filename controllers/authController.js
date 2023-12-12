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
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const phone = req.body.phone;
  const gender = req.body.gender;

  if (password !== confirmPassword) {
    req.flash("errors", "The password doesn't match");
    return res.redirect("/signup");
  }

  try {
    const result = await User.findOne({ where: { email } });

    if (result) {
      req.flash("errors", "This email is taken, try another.");
      return res.redirect("/signup");
    }
  } catch (err) {
    console.log(err);
    req.flash("errors", "An error has occurred. Contact the administrator");
    return res.redirect("/signup");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      firstName,
      lastName,
      dateOfBirth,
      email,
      password: hashedPassword,
      phone,
      gender,
    });
    req.flash("success", "User created successfully");
    return res.redirect("/login");
  } catch (err) {
    console.log(err);
    req.flash("errors", "An error has occurred. Contact the administrator");
    return res.redirect("/signup");
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
      console.log("User not found. Redirecting to home page");
      req.flash("errors", "Invalid Login, Please try again.");
      return res.redirect("/");
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      console.log("Login successful. Setting session variables.");
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save((err) => {
        console.log(err);
        res.locals.LoggedIn = "Hola"; 
        res.redirect("/");
      });
    }

    console.log("Invalid password. Redirecting to home page");
    req.flash("errors", "Invalid Login, Please try again.");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    req.flash("errors", "An error has occurred. Contact the administrator");
    return res.redirect("/");
  }
};

exports.PostLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

