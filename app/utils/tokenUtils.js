const jwt = require('jsonwebtoken');
const redisClient = require('../../config/config');
const crypto = require('crypto');
const { promisify } = require('util');

const generateAccessToken = (userId) => {
  const secretKey = 'test_secret_key';
  const options = { expiresIn: 60 * 60 };

  // Generate the JWT Token
  const accessToken = jwt.sign({ userId: userId }, secretKey, options);
  return accessToken;
};

// Promisify Redis functions
const setAsync = promisify(redisClient.set).bind(redisClient);

async function generateRefreshToken(){
  // Generate a refresh token and store in Redis
  const refreshToken = crypto.randomBytes(64).toString('hex');
  await setAsync(refreshToken, 'true');
  return refreshToken;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
