const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require("./context/appContext");
const flash = require("connect-flash");
const session = require("express-session");

const User = require("./models/auth/User");


const app = express();

const errorController = require("./controllers/ErrorController");


const authRouter = require("./routes/auth");

app.engine(
    "hbs",
    engine({
      layoutsDir: "views/layouts/",
      defaultLayout: "main-layout",
      extname: "hbs",
    })
  );

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret:"Hi Leo",
  resave:false,
  saveUninitialized:false
}
));

app.use(flash());

app.use(async (req, res, next) => {
  if (!req.session) {
    
    return next();
  }
  if (!req.session.user) {
    return next();
  }
  const user = await User.findByPk(req.session.user.id);
      req.user = user;
      next();
});

app.use(async (req,res,next)=>{
  const errors = req.flash("errors");
  const success = req.flash("success");
  const warning = req.flash("warning");

  res.locals.errorMessages = errors;
  res.locals.hasErrorMessages = errors.length > 0;
  res.locals.successMessages = success;
  res.locals.hasSuccessMessages = success.length > 0;
  res.locals.warningMessages = warning;
  res.locals.hasWarningMessages = warning.length > 0;
  next();
})

app.use(authRouter);
app.use("/", errorController.Get404);


sequelize
  .sync()
  .then((result) => {
    app.listen(3030);
  })
  .catch((err) => {
    console.log(err);
  });

