const userModel = require('../models/user.model');
const postModel = require('../models/post.model');
const { ErrorHandler } = require('../utils/errorHandler.utils');
const { bufferToDataURI } = require('../utils/file');
const { uploadToCloudinary } = require('../services/upload.services');

module.exports = {
  async uploadProfile(req, res, next) {

    try {
      const user = await userModel.findOne({_id: req.body.userId});
      console.log(user);
      const { file } = req
      if (!file) throw new ErrorHandler(400, 'Image is required')

      const fileFormat = file.mimetype.split('/')[1]
      const { base64 } = bufferToDataURI(fileFormat, file.buffer)

      const imageDetails = await uploadToCloudinary(base64, fileFormat, user.nickname)


      await userModel.findOneAndUpdate({ _id: req.body.userId },
        {
          $set: {
            picture: imageDetails.url
          }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true });

      res.json({
        status: 'success',
        message: 'Upload successful',
        data: imageDetails,
      })
    } catch (error) {
      next(new ErrorHandler(error.statusCode || 500, error.message))
    }
  },
  async uploadPostImage(req, res, next) {
    try {
    const { file } = req

    if (!file) {
      return next();
    }

    const fileFormat = file.mimetype.split('/')[1]
    const { base64 } = bufferToDataURI(fileFormat, file.buffer)
    const imageDetails = await uploadToCloudinary(base64, fileFormat);

    const post = new postModel({
      posterId: req.body.posterId,
      message: req.body.message,
      picture: imageDetails.url,
      likers: [],
      comments: [],
    });
      await post.save();
      res.status(201).json({ message: "Post created" });
    } catch (error) {
      ErrorHandler(error.statusCode || 500, error.message);
    }
  }
}