const mongoose = require("mongoose");

//these would be the fields in the database
const postSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
    },
    postImageUrl: {
      type: String,
    },
    timesReported:{
      type: Number
    },
    comments: [
      {
        username: String,
        comment: String,
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    savedBy: [
      new mongoose.Schema({
        user: String,
        inspired: [{ type: String }],
      }),
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
