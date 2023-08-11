var express = require("express");
var router = express.Router();
const session = require("express-session");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use((req, res, next) => {
  res.setHeader("cache-control", "no-store");
  next();
});
router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

router.get("/", (req, res) => {
  if (req.session.userId) {
    res.render("dashboard");
  } else {
    res.render("base", { title: "login system" });
  }
});

router.get("/register", (req, res) => {
  res.render("signup");
});
let credential = {
  email: null,
  password: null,
};
router.post("/register", (req, res) => {
  credential.email = req.body.email;
  credential.password = req.body.password;

  res.render("base",{logout: "User created successfully"});
});
//login user
router.post("/login", (req, res) => {
  if (credential.email != null && credential.password!=null) {
    if (
      req.body.email == credential.email &&
      req.body.password == credential.password
    ) {
      req.session.userId = req.body.email;
      res.redirect("/dashboard");
    //   if (req.session.userId) {
    //     res.end("login successfull");
    //   } else {
    //     res.send("login again");
    //   }
    } else {
      res.end("invalid username");
    }
  }else{
    res.send("please create a account first");
  }
});
// login
router.get("/dashboard", (req, res) => {
  if (req.session.userId) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.render("base", { title: "Please login again " });
  }
});
//login
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      res.render("base", { title: "express", logout: "logout succesfully" });
    }
  });
});

module.exports = router;
