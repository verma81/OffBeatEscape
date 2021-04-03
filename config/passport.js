const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("../models/user");

module.exports = function (passport) {
    passport.use(
      new localStrategy((email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }).select('+password');
      })
    );
  
    passport.use(
      new GoogleStrategy(
        {
          clientID:
            "584588754768-c0kfbeom6mamborrkr5auk3flcdbmq4n.apps.googleusercontent.com",
          clientSecret: "I3NnwZbnKwHDpuu7pSP2OkyI",
          callbackURL: "/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
          User.findOne({ googleId: profile.id }, async (err, doc) => {
            if (err) {
              return done(err, null);
            }
  
            if (!doc) {
              const newUser = new User({
                googleId: profile.id,
                username: profile.name.givenName,
              });
  
              await newUser.save();
              done(null, newUser);
            }
            done(null, doc);
          }).select('+password');
        }
      )
    );
  
    passport.use(
      new FacebookStrategy(
        {
          clientID: "350801712700644",
          clientSecret: "eb7e3fe874cf1da9488e91c2f3e07f42",
          callbackURL: "/auth/facebook/callback",
        },
        function (accessToken, refreshToken, profile, done) {
          User.findOne({ facebookId: profile.id }, async (err, doc) => {
            if (err) {
              return done(err, null);
            }
  
            if (!doc) {
              const newUser = new User({
                facebookId: profile.id,
                username: profile.displayName,
              });
  
              await newUser.save();
              done(null, newUser);
            }
            done(null, doc);
          }).select('+password');
        }
      )
    );
  
    passport.serializeUser((user, done) => {
      // done(null, user.id);
      return done(null, user._id);
    });
    // passport.deserializeUser((id, done) => {
    //   User.findOne({ _id: id }, (err, user) => {
    //     const userInformation = {
    //       username: user.username,
    //     };
    //     done(err, userInformation);
    //   });
    // });
  
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, doc) => {
        return done(null, doc); // return goes to the client and binds to the req.user property
      }).select('+password');
    });
  
    passport.deserializeUser((user, done) => {
      return done(null, user);
    });
  };
  