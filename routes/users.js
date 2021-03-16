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
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ success: true, success: "user created" });
      //res.send("User Created");
    }
  });
});

router.patch('/savePost/:username', async (req, res) => {
  const user = await User.findOneAndUpdate({username: req.body.username, new: true, runValidators: true})
  console.log(user)
  console.log('username is' + req.body.username)
  // var saved = {"postId": req.body.postId}
  user.savedPosts.push(req.body.postId)
  try{
    await user.save()
    res.status(201).send({user})
  }catch(e){
      res.status(400).send(e)
  }
})

module.exports = router;
