const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { userId } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findByPk(userId);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ type: "error", message: "Authorization Failed!" });
  }
};
