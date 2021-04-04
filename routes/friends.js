const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/usersList", async (req, res) => {

  const users = await User.find({});

  const userMap = {};

  users.forEach((user) => {
    if(req.user.username != user.username)
    {
      userMap[user.username] = user;
    }
  });
  //console.log("test data", userMap);

  let userData = Object.keys(userMap).map((key) => {
    return userMap[key];
  });
  // const arrayOfUserObj = Object.entries(userMap).map((e) => ({ [e[0]]: e[1] }));

  res.status(200).send(userData);
});

router.post("/sendFriendRequest/:id", (req, res) => {
  let id = req.params.id;
  let friendReqId = req.body._id;

  User.findOne({ _id: Object(id) }, (err, user) => {
    if (user == null) {
      res.json({
        status: "error",
        message: "user does not exist",
      });
    } else {
      User.updateOne(
        { _id: Object(friendReqId) },
        {
          $push: {
            notifications: {
              type: "friend_req",
              content: user.username + " has send you a friend request",
              profileImage: user.profileImage,
              currentUserId: friendReqId,
              friendUserId: user._id,
              createdAt: new Date().getTime(),
            },
          },
        },
        (err, data) => {
          if (err) {
            res.json({
              status: "error",
              message: "Friend notification not updated",
            });
          }
        }
      );
      User.updateOne(
        { _id: Object(id) },
        {
          $push: {
            friends: {
              _id: req.body._id,
              username: req.body.username,
              profileImage: req.body.profileImage,
              status: "Pending",
              sentByMe: true,
            },
          },
        },
        (err, data) => {
          User.updateOne(
            { _id: Object(friendReqId) },
            {
              $push: {
                friends: {
                  _id: user._id,
                  username: user.username,
                  profileImage: user.profileImage,
                  status: "Pending",
                  sentByMe: false,
                },
              },
            },
            (err, data) => {
              res.json({
                status: "success",
                message: "Friend request has been sent",
              });
            }
          );
        }
      );
    }
  });
});

router.post("/acceptFriendRequest/:id", (req, res) => {
  let id = req.params.id;
  let friendReqId = req.body._id;
  User.findOne({ _id: Object(id) }, (err, user) => {
    if (user == null) {
      res.json({
        status: "error",
        message: "user does not exist",
      });
    } else {
      console.log("value of user 1", user);
      let me = user;
      console.log("value of user 2 ", me);

      User.findOne({ _id: Object(friendReqId) }, (err, userInfo) => {
        console.log("value of friend", userInfo);

        if (userInfo == null) {
          res.json({
            status: "error",
            message: "user does not exsist",
          });
        } else {
          User.updateOne(
            { _id: Object(userInfo._id) },
            {
              $push: {
                notifications: {
                  type: "friend_req_accepted",
                  content: me.username + " accepted your friend request",
                  profileImage: me.profileImage,
                  createdAt: new Date().getTime(),
                },
              },
            },
            (err, data) => {
              if (err) {
                res.json({
                  status: "error",
                  message: "Friend notification not updated",
                });
              }
            }
          );
          User.updateOne(
            {
              $and: [
                {
                  _id: Object(userInfo._id),
                },
                {
                  "friends._id": Object(me._id),
                },
              ],
            },
            {
              $set: {
                "friends.$.status": "Accepted",
                "friends.$.username" : me.username
              },
            },
            { upsert: true },
            (err, data) => {
              User.updateOne(
                {
                  $and: [
                    {
                      _id: Object(me._id),
                    },
                    {
                      "friends._id": Object(userInfo._id),
                    },
                  ],
                },
                {
                  $set: {
                    "friends.$.status": "Accepted",
                  },
                },
                (error, data) => {
                  res.json({
                    status: "success",
                    message: "Friend request has been accepted",
                  });
                }
              );
            }
          );
        }
      });
    }
  });
});

module.exports = router;
