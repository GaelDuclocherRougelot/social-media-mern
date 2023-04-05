const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { upload } = require('../services/upload.services');

// auth
router.route('/register')
  .post(authController.register);
router.route('/login')
  .post(authController.login);
router.route('/logout')
  .get(authController.logout);

// user
router.route('/')
  .get(userController.getAllUsers)

router.route('/:id')
  .get(userController.getOneUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

router.route('/follow/:id')
  .patch(userController.follow)
router.route('/unfollow/:id')
  .patch(userController.unfollow)

router.route('/upload')
  .post(upload.single('image'), uploadController.uploadProfile)



module.exports = router;