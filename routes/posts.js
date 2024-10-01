const express = require("express");
const router = express.Router();
const postController = require('../controllers/posts.js')

//validators
const validator = require("../middlewares/validator.js")
const postsValidations = require("../validations/posts.js")

router.post('/', validator(postsValidations.bodyData), postController.store)
router.get('/', postController.index)
router.get('/latests', postController.latestPosts)
router.get('/category/:categoryId', postController.getPostsByCategory)

router.use("/:slug", validator(postsValidations.paramSlug)); //qui vale per tutti

router.get('/:slug', validator(postsValidations.paramSlug), postController.show) //posso metterlo singolarmente
router.delete('/:slug', postController.destroy)
router.put('/:slug', validator(postsValidations.bodyData), postController.update)

module.exports = router;