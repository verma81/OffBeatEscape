const mongoose = require('mongoose');

require('dotenv').config();

/**
 * DATABASE 
 */

const devConnection = process.env.DB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

// Connect to the correct environment database
if (process.env.NODE_ENV === 'production') {
    mongoose.connect(prodConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
} else {
    mongoose.connect(devConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
}

