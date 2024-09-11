const passport = require("passport");
const session = require("express-session");
const express = require("express");
const path = require("path");
const app = express();

require("./auth.js");
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
    successRedirect: "/auth/protected",
  })
  // function(req, res) {
  //   // Successful authentication, redirect home.
  //   res.redirect('/');
  // }
);

app.get("/auth/google/failure", (req, res) => {
    res.send('Something went wrong!');
})

app.get("/auth/protected", isLoggedIn, (req, res) => {
    let name = req.user.displayName;
    res.send(`Hello ${name}`);
});

app.use('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
