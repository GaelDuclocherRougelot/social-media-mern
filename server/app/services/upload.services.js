const cloudinary = require('cloudinary').v2;
const multer = require("multer");
const { ErrorHandler } = require('../utils/errorHandler.utils');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
});

const uploadToCloudinary = async (fileString, format, fileName) => {
  try {
    const { uploader } = cloudinary;
    if(fileName !== undefined){
      const res = await uploader.upload(
      `data:image/${format};base64,${fileString}`, {
        folder: "profile_pictures",
        unique_filename: true,
        public_id: fileName
      }
      );
      return res;
    }else {
      const res = await uploader.upload(
        `data:image/${format};base64,${fileString}`, {
        folder: "pictures",
      }
      );
      return res;
    }

  } catch (error) {
    throw new ErrorHandler(500, error);
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
};