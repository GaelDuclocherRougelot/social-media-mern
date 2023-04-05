const postModel = require('../models/post.model');
const userModel = require('../models/user.model');
const objectId = require('mongoose').Types.ObjectId;
const { bufferToDataURI } = require('../utils/file');
const { uploadToCloudinary } = require('../services/upload.services');
const cloudinary = require('cloudinary').v2;

module.exports = {
  async getPosts(req, res) {
    try {
      const posts = await postModel.find().sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createPost(req, res) {

    const post = new postModel({
      posterId: req.body.posterId,
      message: req.body.message,
      likers: [],
      comments: [],
    });

    try {
      await post.save();
      res.status(201).json({ message: "Post created" });
    } catch (error) {
      res.json(error.message)
    }
  },
  async deletePost(req, res) {
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: `Post not found with id : ${req.params.id}` });
    };

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
      });

    try {
      const currentPost = await postModel.findById(req.params.id).select('picture');

        if(currentPost.picture){
          // get name of the uploaded image 
          const regex = /pictures\/([^;]*).(jpg|png|jpeg)/;
          const fileName = currentPost.picture.match(regex)

          // delete the image stored in cloudinary
          cloudinary.uploader
            .destroy(`pictures/${fileName[1]}`)
            .then(result => console.log(result));
        };
        
      // delete the current post
      await postModel.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Post deleted" });

    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  async updatePost(req, res) {
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: `Post not found with id : ${req.params.id}` });
    };
    const updatedRecord = {
      message: req.body.message
    };
    postModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err) => {
        if (err) {
          console.log('Failed to Update the post:' + err);
        } else {
          res.status(200).json({ message: "Post updated" });
        }
      });
  },
  async likePost(req, res) {
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: `Post not found with id : ${req.params.id}` });
    };
    try {
      const update = {
        $addToSet: {
          likers: req.body.likerId,
        },
      };
      const options = {
        new: true,
        upsert: true,
      };
      // like in the likers array
      await postModel.findByIdAndUpdate(req.params.id, update, options).lean().exec();

      update['$addToSet'] = {
        likes: req.params.id
      };

      // add like in likes array
      await userModel.findByIdAndUpdate(req.body.likerId, update, options).lean().exec();

      res.status(200).json({ message: "Post liked" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async unlikePost(req, res) {
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: `Post not found with id : ${req.params.id}` });
    };
    try {
      const update = {
        $pull: { likers: req.body.unlikerId },
      };
      const options = {
        new: true,
        upsert: true,
      };
      // remove like from likers array
      await postModel.findByIdAndUpdate(req.params.id, update, options).lean().exec();

      update['$pull'] = {
        likes: req.params.id
      };
      // remove like from likes array
      await userModel.findByIdAndUpdate(req.body.unlikerId, update, options).lean().exec();

      res.status(200).json({ message: "Post unliked" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async commentPost(req, res) {
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: `Post not found with id : ${req.params.id}` });
    };
    try {
      const update = {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterNickname: req.body.commenterNickname,
            text: req.body.text,
            timestamp: new Date().getTime()
          }
        }
      };
      const options = {
        new: true,
        upsert: true,
      };
      // add comment to comments array
      await postModel.findByIdAndUpdate(req.params.id, update, options).sort({ createdAt: -1 }).lean().exec();

      res.status(200).json({ message: "Post commented" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async editCommentPost(req, res) { //! to FIX
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: `Post not found with id : ${req.params.id}` });
    };

    try {
      return PostModel.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
          comment._id.equals(req.body.commentId)
        );

        if (!theComment) return res.status(404).send("Comment not found");
        theComment.text = req.body.text;

        return docs.save((err) => {
          if (!err) return res.status(200).send(docs);
          return res.status(500).send(err);
        });
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async deleteCommentPost(req, res) {
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: `Post not found with id : ${req.params.id}` });
    };
    try {
      const update = {
        $pull: {
          comments: {
            _id: req.body.commentId
          }
        },
      };
      const options = {
        new: true,
        upsert: true,
      };
      // remove comment from comments array
      await postModel.findByIdAndUpdate(req.params.id, update, options).lean().exec();

      res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

};