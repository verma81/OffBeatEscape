const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/auth',require('./oauth'));
router.use('/post', require('./post'));

module.exports = router;