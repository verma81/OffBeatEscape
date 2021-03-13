const mongoose = require('mongoose')

//these would be the fields in the database
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },  
    description:{
        type: String,
        required: true,
        trim: true,
        minLength: 10
    },
    postImageUrl:{
        type: String
    },
    comments:[{
        username: String,
        comment: String
    }]

    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post