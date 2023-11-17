const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require("./context/appContext");
const flash = require("connect-flash");


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

