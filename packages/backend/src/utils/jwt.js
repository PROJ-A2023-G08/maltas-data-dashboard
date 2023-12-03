const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '200h',
  });
}


function generateRefreshToken(user, jti) {
  return jwt.sign({
    userId: user.id,
    isAdmin: user.isAdmin,
    jti
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '200h',
  });
}

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};