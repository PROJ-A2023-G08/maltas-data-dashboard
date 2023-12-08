const { db } = require('../../utils/db');
const { hashToken } = require('../../utils/hashToken');

function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
  return db.refreshToken.create({
    data: {
      jti,
      hashedToken: hashToken(refreshToken),
      userId
    },
  });
}

function findRefreshTokenByJti(jti) {
  return db.refreshToken.findUnique({
    where: {
      jti,
    },
  });
}

function deleteRefreshToken(id) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

function revokeTokens(userId) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}

module.exports = {
  addRefreshTokenToWhitelist,
  findRefreshTokenByJti,
  deleteRefreshToken,
  revokeTokens
};