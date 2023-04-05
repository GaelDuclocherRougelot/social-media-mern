const router = require('express').Router();
const postController = require('../controllers/post.controller');
const uploadController = require('../controllers/upload.controller');
const { upload } = require('../services/upload.services');

router.route('/')
  .get(postController.getPosts)
  .post(upload.single('image'), uploadController.uploadPostImage, postController.createPost);

router.route('/:id')
  .put(postController.updatePost)
  .delete(postController.deletePost);

// like routes
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// comments routes
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.delete('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;
