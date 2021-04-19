const express = require('express')
const router = express.Router()
const postController = require('../controller/post.controller')
const requireLogin = require('../middleware/requireLogin')

router.route('/').post(requireLogin,postController.create);
router.route('/').get(postController.getPost)
router.route('/mypost').get(requireLogin,postController.myPost)

module.exports = router;