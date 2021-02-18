const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');


require('dotenv').config();

// Create the Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

require('./models/user');

require('./config/passport')(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Allows our Angular application to make HTTP requests to Express application
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/dist/client')));

/**
 * -------------- ROUTES ---------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));


/**
 * -------------- SERVER ---------------
 */
app.listen(3000);
