require('dotenv').config();
const express = require('express')
const Post = require('../models/post')
const router = new express.Router()          //all the required apis
const passport = require('passport');
const multer = require('multer')
const uuid = require('uuid/v4')

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

const singleUpload = upload.single('image')



router.post('/addPost',singleUpload, async (req, res) => {            //adding a new post
    const post = new Post()
    post.owner = req.user.username
    post.title = req.body.title,
    post.description  =  req.body.description
    if(req.file){
        post.postImageUrl = req.file.location
    }
    var savedPost = {"user":req.user.username,"inspired":[]}
    post.savedBy.push(savedPost);

    try{
        await post.save()
        res.status(201).send({post})
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/addComment/:id', async(req,res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    var comments = {"username": req.user.username, "comment": req.body.comment}
    post.comments.push({
      $each: [comments],
      $position: 0
    })
    try{
        await post.save()
        res.status(201).send({post})
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/reportPost/:id', async (req, res) => {
  post = await Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { timesReported: 1 } }, {new: true })
  console.log(post)
  try{
     await post.save()
    res.status(201).send({post})
  }catch(e){
      res.status(400).send(e)
  }
})

router.patch('/savepost/:id', async (req, res) => {

  var notifier = req.body.notifier
  if(notifier === undefined)
  {
    notifier = req.body.owner
  }
  let post = await Post.updateOne({_id:req.body.postId,"savedBy.user":notifier},
  {$push:{"savedBy.$.inspired":req.body.user}})
  //console.log(post)

  post = await Post.updateOne({_id:req.body.postId},
    {$push:{savedBy:{"user":req.body.user,"inspired":[]}}})

})

router.get('/getMyPosts', async (req, res) => {                             //getting posts of logged in user
    try {
        const posts = await Post.find({"owner":req.user.username})
        res.send(posts)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/getPostsOfAUser/:username', async (req, res) => {                             //getting posts of a particular user
    try {
        console.log(req.params)

        const posts = await Post.find({"owner":req.params.username})
        res.send(posts)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/getAllPosts', async (req, res) => {                                        //getting all posts
    try {
        const posts = await Post.find({})
        res.send(posts)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/posts/:id',  async (req, res) => {                            //getting single post by postid
    const _id = req.params.id

    try{
        const post = await Post.findById(_id)

        if(!post){
            return res.status(404).send()
        }

        res.send(post)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/posts/:id', async (req, res) => {                             // updating single post by postid
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }

    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!post){
            res.status(404).send()
        }

        res.send(post)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/posts/:id', async (req, res) => {                   //deleting a post by postid
    try{
        const post = await Post.findByIdAndDelete(req.params.id)

        if(!post){
            res.status(404).send()
        }

        res.send(post)
    }catch(e){
        res.status(500).send()
    }
})

// This api shall return inspiration cycle for a post saved by user.
// For eg,
// User A created post - 1
// User B saved it.
//        Now if user B opens the post, inspiration cycle shown will be B->A i.e. B was inspired by A
// User C is notified "B saved a Post" and he clicks the notification and saves the post too.
//        Now if user C opens the post, inspiration cycle shown will be C->B->A i.e. C was inspired by B and so on.
//
// For api to work, following payload is needed :
//   user : for which cycle is to be fetched.
//   owner : post owner
//   title : post title
//
// If user C is logged in, and has saved this post, he shall always see the cycle for himself.
router.post('/inspirationCycle', async (req, res) => {                   //getting cycle for a saved post
//  console.log("cycle logic called")
  var cycle = []
  var isCycleComplete = 0;
  var temp = req.body.user
  const id = req.body.postId
  try{

    const post = await Post.findById(id)

    if(!post){
        return res.status(404).send()
    }
    while(isCycleComplete != 1)
    {
    //  console.log("Fetching inspirer for " + temp)

      await Post.aggregate(
        [
          {
            $match : {
              $and:[{"title": post.title},{"owner": post.owner}]
            }
          },
          {
            $unwind : "$savedBy"
          },
          {
            $match : {
              "savedBy.inspired" : temp
            }
          },
          {
            $project : {
              "inspirer" : "$savedBy.user", _id:0
            }
          }
        ]

      ).then(
        function(queryRes) {
          if(queryRes.length > 0)
          {
            cycle.push(temp)
            if(queryRes[0].inspirer === post.owner)
            {
              cycle.push(queryRes[0].inspirer)
              isCycleComplete = 1;
            }
            temp = queryRes[0].inspirer
          }
          else {
            isCycleComplete = 1;
          }
        }
      )
    }
    // console.log("Cycle : " + cycle)
    res.send(cycle)
  }catch(e){
    res.status(500).send()
  }
})
module.exports = router
