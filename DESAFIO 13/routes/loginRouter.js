const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectMongo = require("connect-mongo");
const passport = require("../DB/configPassport");

router.use(cookieParser());
router.use(
  session({
    store: connectMongo.create({
      mongoUrl:
        "mongodb+srv://ipasciucco:39603426@cluster0.1lcuy.mongodb.net/sessions?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 600,
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("pages/login");
  }
});

router.get("/error", (req, res) => {
  res.render("pages/loginError");
});

router.post(
  "/",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login/error",
  })
);

router.get("/logout", (req, res) => {
  const nombre = req.session.passport.user;
  req.logout((err) => {
    if (err) {
      res.send({ status: "logout error" });
    } else {
      res.render("pages/logout", { nombre });
    }
  });
});

module.exports = router;
