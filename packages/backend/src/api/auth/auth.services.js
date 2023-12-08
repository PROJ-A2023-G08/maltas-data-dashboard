const { db } = require('../../utils/db');
const { hashToken } = require('../../utils/hashToken');

async function saveMeasurementToDataBase(measurement_id, device_id, role_id, start_time_iso, end_time_iso, total_time_spent, status) {  
  return await db.measurement.create({
    data: {
      measurement_id: measurement_id,    
      device_id: device_id,    
      role_id: role_id,    
      start_time_iso: start_time_iso,
      end_time_iso: end_time_iso,
      total_time_spent: total_time_spent,
      status: status
    },
  });
}

async function getMeasurements() {
  return await db.measurement.findMany({orderBy: {
    measurement_id: 'asc',
  },
});
}

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
  saveMeasurementToDataBase,
  getMeasurements,
  addRefreshTokenToWhitelist,
  findRefreshTokenByJti,
  deleteRefreshToken,
  revokeTokens
};