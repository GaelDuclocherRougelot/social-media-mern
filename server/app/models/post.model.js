const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxLength: 500
    },
    picture: {
      type: String
    },
    video: {
      type: String
    },
    likers: {
      type: [String],
      required: true
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterNickname: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', postSchema);
