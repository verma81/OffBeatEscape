require('dotenv').config();
const express = require('express')
const Post = require('../models/post')
const User = require("../models/user");
const router = new express.Router()          //all the required apis
const passport = require('passport');

router.get('/generalFeed', async (req, res) => {         //get posts of all friends in general feed.

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
        //console.log(feedobj)
        res.send(feedobj);
      }
    )
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/trendingPosts', async (req, res) => {         //get trending posts from friends

  const trendingPostsPipeline = [
    {
      '$match' : {
        "username": req.user.username
      }
    },
    {
      '$lookup' : {
        from: "posts",
        localField: "friends.username",
        foreignField: "owner",
        as: "feed"
      }
    },
    {
      '$unwind' : "$feed"
    },
    {
      '$project' : {
        "owner":"$feed.owner",
        "title":"$feed.title",
        "description":"$feed.description",
        "postImageUrl":"$feed.postImageUrl",
        "comments":"$feed.comments",
        "_id":"$feed._id",
        "count": {
          '$size':"$feed.savedBy"
        }
      }
    },
    {
      '$sort' : {
        "count":-1
      }
    },
    {
      '$limit' : 6
    }
  ]

  try {
    User.aggregate(trendingPostsPipeline).then(
      function (queryRes) {
        //console.log(queryRes);
        res.send(queryRes);
      }
    )
  } catch (e) {
    res.status(500).send()
  }
});

module.exports = router;
