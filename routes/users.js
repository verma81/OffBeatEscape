const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

//validate an existing user
router.post('/login', function(req,res, next){

    User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });

});

//register a new user

router.post('/register', function(req,res,next){
   
    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    try {
    
        newUser.save()
            .then((user) => {
                
                const jwt = utils.issueJWT(user);

                res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }


});

//jwt auth route check
router.get('/protected', passport.authenticate('jwt',{session: false}), (req,res,next)=>{
    res.status(200).json({ success: true, msg: "successfully authecliennticated to this route!"});

})

module.exports = router;