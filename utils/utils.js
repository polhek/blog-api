const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

function issueJWT(user) {
  const _id = user._id;
  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, secretKey, {
    expiresIn: expiresIn,
  });

  return { token: 'Bearer ' + signedToken, expires: expiresIn };
}

module.exports.issueJWT = issueJWT;
