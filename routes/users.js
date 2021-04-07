const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const user = require("../models/user");
const multer = require('multer')
const aws = require("aws-sdk");
const multerS3 = require("multer-s3-v2");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "imageblobs",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: 'TESTING_META_DATA'});
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

const singleUpload = upload.single('profileImage')


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

router.patch('/addProfileImage/:username', singleUpload, async (req, res) => {
  const user = await User.findOne({ username: req.params.username }, {new: true, runValidators: true})
  user.profileImage = req.file.location
  try{
    await user.save()
    res.status(201).send(user)
  }catch(e){
    res.status(400).send(e)
  }
})

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
        if(req.body.owner == friend.username)
        {
          continue
        }
        //console.log("sending notification to " + friend)
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

  //console.log('username is' + req.body.user)
  userData.savedPosts.push(req.body.postId)
  try{
    await userData.save()
    res.status(201).send({userData})
  }catch(e){
      res.status(400).send(e)
  }
})

module.exports = router;
