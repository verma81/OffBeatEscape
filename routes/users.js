const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json({ success: true, data: res.data });
        // res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ success: true, success: "user created" });
      //res.send("User Created");
    }
  }).select('+password');
});

router.patch('/savePost/:username', async (req, res) => {

// sending notification logic
  User.findOne({ username: req.body.user }, (err, user) => {
    if (user == null)
    {
      res.json({
        status: "error",
        message: "user does not exist",
      });
    }
    else
    {
      let friendsList = user.friends;
      for(const friend of friendsList)
      {
        User.findOneAndUpdate(
          { _id: Object(friend._id) },
          {
            $push: {
              notifications: {
                type: "post_saved",
                content: user.username + " saved a post.",
                notifier: user.username,
                postId: req.body.postId,
                profileImage: user.profileImage,
                createdAt: new Date().getTime(),
              }
            }
          },(err, data) => {
            if (data == null)
            {
              res.json({
                status: "error",
                message: "user does not exist",
              });
            }
          });
        }
      }
  });

// saving logic

  let userData = await User.findOneAndUpdate({username: req.body.user}, {new: true, runValidators: true})

  console.log('username is' + req.body.user)
  userData.savedPosts.push(req.body.postId)
  try{
    await userData.save()
    res.status(201).send({userData})
  }catch(e){
      res.status(400).send(e)
  }
})

module.exports = router;
