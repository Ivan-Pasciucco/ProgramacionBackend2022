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
    res.render("pages/index", { nombre: req.session.passport.user });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
