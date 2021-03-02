const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./models/user");

require('dotenv').config();

// Create the Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

require('./models/user');

require('./config/passport')(passport);


// app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4200", // <-- client app
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());



// app.use(express.static(path.join(__dirname, 'client/dist/client')));

/**
 * -------------- ROUTES ---------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));


app.get("/getuser", (req, res) => {
    res.send(req.user);
  });
  
  app.get("/logout", (req, res) => {
    if (req.user) {
      req.logout();
      res.send("done");
    }
  });  

/**
 * -------------- SERVER ---------------
 */
app.listen(3000);
