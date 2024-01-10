const { Router } = require("express");
const  User = require('./Users.js')
const  Post  = require('./Posts.js')

const router = Router();

router.use('/', User);
router.use('/', Post);

module.exports = router;