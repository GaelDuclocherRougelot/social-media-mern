const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minlength: 6
  },
  picture: {
    type: String,
    default: "/random-user.jpeg"
  },
  bio: {
    type: String,
    maxlength: 1024
  },
  followers: {
    type: [String]
  },
  following: {
    type: [String]
  },
  likes: {
    type: [String]
  }
},
  {
    timestamps: true
  }
);

// hash password before saving data
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
  } catch (error) {
    throw Error(error.message)
  }
  
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;