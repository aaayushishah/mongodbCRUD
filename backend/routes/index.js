const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const usercontroller = require('../controllers/usercontroller');


router.get('/', function (req, res) {
    res.json('Welcome');
});
router.use('/user', usercontroller);
module.exports = router;