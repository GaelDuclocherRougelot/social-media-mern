const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
require('dotenv').config();

module.exports = {
  checkUser(req, res, next) {
    const token = req.headers.authorization;
      if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if(err) {
            req.session.user = null;
            res.clearCookie('jwt');
            next();
            }else{
              const user = await userModel.findById(decoded.id).select('-password');
              req.session.user = user;
              next();
            }
        });
      }else {
        // req.session.user = null;
        // req.session.token = null;
        next();
      }
  },
  requireAuth(req, res, next) {
    const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.sendStatus(401);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
  }


};
