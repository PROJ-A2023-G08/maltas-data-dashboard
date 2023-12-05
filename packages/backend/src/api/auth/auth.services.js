const { db } = require('../../utils/db');
const { hashToken } = require('../../utils/hashToken');

async function saveMeasurementToDataBase(measurement_id, device_id, role_id, start_time_iso, end_time_iso, total_time_spent, status) {  
  const result = await db.measurement.create({
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
  console.log(result);
  return result;
}

async function getMeasurementData(id) {
  try {
    const result = await db.measurement.findMany({
      where: {
        measurement_id: id, 
      },
    });
    return result;
  } catch (error) {
    console.error('Error when looking for measurement:', error);
    throw error; 
  }
}
async function getRoleData(id) {
  try {
    const result = await db.measurement.findMany({
      where: {
        role_id: id, 
      },
    });
    return result;
  } catch (error) {
    console.error('Error when looking for measurement:', error);
    throw error; 
  }
}

async function getAllMeasurements() {
  const allMeasurements = await db.measurement.findMany();
  console.log('Measurements found: ', allMeasurements.count);
  return allMeasurements;
}

async function deleteAllMeasurements() {
  var result;
  try {
    /*for (let i = 0; i <= 370; i++) {
      const stringValue = `${i}`;
      console.log(stringValue);
      result = db.measurement.deleteMany({
        where: { measurement_id: stringValue}
      });*/
    //result = db.measurement.deleteMany({ where: {
    //device_id: "1"}}) 
    console.log(await db.measurement.deleteMany({ where: {
      measurement_id: "371"}}));
    //
    //console.log(result.count);
  //}
    //console.log('Deleted', result.count, 'measurements.');
    return result;
  } catch (error) {
    console.error('Error deleting measurements:', error);
  }
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
  getMeasurementData,
  getRoleData,
  getAllMeasurements,
  deleteAllMeasurements,
  addRefreshTokenToWhitelist,
  findRefreshTokenByJti,
  deleteRefreshToken,
  revokeTokens
};