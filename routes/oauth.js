const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");



// ----------------------------google Oauth-------------------------------

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] })
  );
  
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "http://localhost:4200/login",
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("http://localhost:4200/dashboard");
    }
  );
  
  //---------------------------facebook Oauth------------------------------
  
  router.get("/facebook", passport.authenticate("facebook"));
  
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "http://localhost:4200/login",
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("http://localhost:4200/dashboard");
    }
  );
  


module.exports = router;
