const mongoose = require("mongoose");
const user = new mongoose.Schema({
  email: String,
  username: String,
  password: { type: String, select: false },
  profileImage: { type: String },
  googleId: {
    required: false,
    type: String,
  },
  facebookId: {
    required: false,
    type: String,
  },
  savedPosts: [
    {
      postId: String,
    },
  ],
  friends: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          required: true,
          auto: true,
        },
        username: { type: String },
        profileImage: { type: String },
        status: { type: String },
        sentByMe: { type: Boolean },
      },
    ],
  },
  notifications: {
    type: [
      {
        _id: { type: String },
        username: { type: String },
        profileImage: { type: String },
        status: { type: String },
        sentByMe: { type: Boolean },
        _id: { type: String },
        type: { type: String },
        content: { type: String },
        profileImage: { type: String },
        friendId: { type: String },
        currentUserId: { type: String },
        friendUserId: { type: String },
        createdAt: { type: Date },
        postId: { type: mongoose.Schema.Types.ObjectId },
        notifier: {type:String},
      },
    ],
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", user);
