const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
  googleId: {
    required: false,
    type: String
  },
  facebookId: {
    required: false,
    type: String
  }

});

module.exports = mongoose.model("User", user);
