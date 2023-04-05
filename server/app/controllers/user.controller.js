const userModel = require('../models/user.model');
const objectId = require('mongoose').Types.ObjectId;
const session = require('express-session');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await userModel.find().select('-password');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getOneUser(req, res) {
    if (!objectId.isValid(req.params.id)) {
      return res.status(404).json({ message: `User not found with id : ${req.params.id}` });
    };

    try {
      const user = await userModel.findById(req.params.id).select('-password');
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async updateUser(req, res) {
    if(!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: `User not found with id : ${req.params.id}` });
    };

    try {
      const user = await userModel.findOneAndUpdate(
      {_id: req.params.id},
      {
        $set: {
          bio: req.body.bio
        }
      },
      { new: true , upsert: true, setDefaultsOnInsert: true }
    ).select('-password');
    res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async deleteUser(req, res) {
    if(!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: `User not found with id : ${req.params.id}` });
    };

    try {
      await userModel.deleteOne({_id: req.params.id});
      res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async follow(req, res) {
    if(!objectId.isValid(req.params.id) || !objectId.isValid(req.body.idToFollow)) {
      return res.status(400).json({ message: `User not found` });
    };

    try {
      const update = {
              $addToSet: {
                    following: req.body.idToFollow,
              },
            };
            const options = {
                new: true,
                upsert: true,
            };
            // follow an user (add the target to my following list)
            await userModel.findByIdAndUpdate(req.params.id, update, options).lean().exec();

            // Add the current user (me) to the target user's followers list
            update['$addToSet'] = {
                followers: req.params.id
            };
            await userModel.findByIdAndUpdate(req.body.idToFollow, update, options).lean().exec();
    
            return res.status(204).json({message: "User followed successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
async unfollow(req, res) {
    if(!objectId.isValid(req.params.id) || !objectId.isValid(req.body.idToUnfollow)) {
      return res.status(400).json({ message: `User not found` });
    };

    try {
      const update = {
              $pull: {
                  following: req.body.idToUnfollow,
              }
            };
      const options = {
            new: true,
            upsert: true,
        };
        // unfollow an user (remove the target from my following list)
        await userModel.findByIdAndUpdate(req.params.id, update, options).lean().exec();

        // Remove the current user (me) from the target user's followers list
        update['$pull'] = {
            followers: req.params.id
        };
        await userModel.findByIdAndUpdate(req.body.idToUnfollow, update, options).lean().exec();
        
        res.status(204).json({message: "User unfollowed successfully"});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  
};