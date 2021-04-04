require('dotenv').config();
const express = require('express')
const Post = require('../models/post')
const User = require("../models/user");
const router = new express.Router()          //all the required apis
const passport = require('passport');

router.get('/generalFeed', async (req, res) => {         //get posts of all friends in general feed.

console.log("General feed api called for " + req.user.username)
  const generalFeedPipeline = [
    {
      '$match' : {
        "username":req.user.username
      }
    },
    {
      '$lookup' : {
        from:"posts",
        localField:"friends.username",
        foreignField:"owner",
        as:"feed"
      }
    }
  ]

  try {
    User.aggregate(generalFeedPipeline).then(
      function (queryRes) {
        //console.log(queryRes);
        const feedobj  = queryRes[0].feed;
        console.log(feedobj)
        res.send(feedobj);
      }
    )
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;
