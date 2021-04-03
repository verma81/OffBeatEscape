const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/auth',require('./oauth'));
router.use('/post', require('./post'));
router.use('/users', require('./friends'));

module.exports = router;