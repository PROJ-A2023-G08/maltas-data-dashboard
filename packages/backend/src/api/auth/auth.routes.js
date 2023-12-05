const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const csv = require('csv-parser');

const {
  findUserByEmail,
  createUser,
  findUserById,
} = require('../users/users.services');
const { generateTokens } = require('../../utils/jwt');
const {
  saveMeasurementToDataBase,
  getMeasurementData,
  getRoleData,
  getAllMeasurements,
  deleteAllMeasurements,
  addRefreshTokenToWhitelist,
  findRefreshTokenByJti,
  deleteRefreshToken,
  revokeTokens,
} = require('./auth.services');
const { hashToken } = require('../../utils/hashToken');
const { db } = require('../../utils/db');
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');

const router = express.Router();

router.get('/getDataCount', async (req, res, next) => {
  // for testing
  try { 
    const count = await db.measurement.count({});
    console.log(count);
    res.json(count);
  } catch (err) {
    next(err);
  }
});

router.delete('/deleteData', async (req, res, next) => {
  try { 
    result = deleteAllMeasurements();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/saveData', async (req, res, next) => {
    const csvFile = 'data.csv';
    var result; 
    var counter = 0;
    fs.createReadStream(csvFile).pipe(csv({ separator: ';' }))
    .on('data', async (row) => {
      try {
        result = await saveMeasurementToDataBase(parseInt(row.measurement_id), parseInt(row.device_id), parseInt(row.role_id), row.start_time_iso, row.end_time_iso, parseInt(row.total_time_spent), row.status);
        counter++;
        console.log(counter);
        console.log('result is: ', result);
      } catch (err) {
      next(err);
      }      
    })
    .on('end', async () => {
      console.log('now here');
      
    });
    res.json({ message: 'Saving data to database'});
  
});

router.get('/getMeasurementData', async (req, res, next) => {
  try { 
    const measurement_id = "1";
    console.log("Data from measurement", measurement_id);
    const result = await getMeasurementData(measurement_id);
    res.json(result );
  } catch (err) {
    next(err);
  }
});

router.get('/getRoleData', async (req, res, next) => {
  try { 
    const id = "1";
    console.log("Data from role", id);
    const result = await getRoleData(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/getData', async (req, res, next) => {
  try { 
    const result = await getAllMeasurements()
    .then((measurements) => res.json(measurements))
    .catch((error) => console.error('Error fetching measurements:', error))
    .finally(async () => { 
    console.log('all measurement is on res');
    });
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error('You must provide all fields.');
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error('Email already in use.');
    }

    const user = await createUser({ firstName, lastName, email, password });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/refreshToken', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenByJti(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/revokeRefreshTokens', async (req, res, next) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
