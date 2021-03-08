const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/auth',require('./oauth'));

module.exports = router;