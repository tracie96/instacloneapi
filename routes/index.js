const express = require('express');
const router = express.Router();
const UserRoute = require('./auth.route');
const PostRoute = require('./post.route');

router.use("/auth", UserRoute);
router.use("/post", PostRoute);

module.exports = router;
