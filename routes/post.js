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

    try{
        await post.save()
        res.status(201).send({post})
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/addComment/:id', async(req,res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    var comments = {"username": req.body.username, "comment": req.body.comment}
    post.comments.push(comments)
    try{
        await post.save()
        res.status(201).send({post})
    }catch(e){
        res.status(400).send(e)
    }
})

// router.patch('/savePost/:id', async(req, res) => {
//     const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//     var saved = {"title": req.body.title, 'id': req.body.id}
//     post.savedPosts.push(saved)
//     try{
//         await post.save()
//         res.status(201).send({post})
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

router.get('/getMyPosts', async (req, res) => {                             //getting posts of logged in user
    try {
        const posts = await Post.find({"owner":req.user.username})
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

module.exports = router
