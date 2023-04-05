const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const errors = require('../utils/errors.utils')
require('dotenv').config();

const createToken = (id) => {
      return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });    
  };

module.exports = {
  async register(req, res) {
    const { nickname, email, password } = req.body;
    try {
      const user = await userModel.create({ nickname, email, password });
      res.status(201).json({ user: user._id });
    } catch (error) {
      const errorRegister = errors.registerErrors(error);
      res.status(500).json({errorRegister});
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    try {
      const user = await userModel.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
      res.json({ access_token: token})
        
      } catch (error) {
        let errorLogin = errors.loginErrors(error.message);
        res.json({errorLogin});
      }
  },
  async logout(req, res) {
    res.clearCookie('jwt');
    res.redirect('/');
  }
}