const express = require('express');
const bcrypt = require('bcrypt');
const { isAuthenticated } = require('../../middlewares');
const { v4: uuidv4 } = require('uuid');
const { generateTokens } = require('../../utils/jwt');
const { findUserById, updateUser, findUserByEmail } = require('./users.services');
const { addRefreshTokenToWhitelist } = require('../auth/auth.services');

const router = express.Router();

router.get('/profile', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/update-password', isAuthenticated, async (req, res, next) => {
  const { email, currentPassword, newPassword} = req.body;

  try {
    // Find the user by email
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Compare the current password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }
    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await updateUser(email, {password:hashedNewPassword});

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

router.put('/update-user-info', isAuthenticated,  async (req, res, next) => {
  const { email, firstName, lastName, gender, notification, phoneNumber, address, city, postalCode } = req.body;

  try {
    // Find the user by email
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
   
    await updateUser(email, {firstName, lastName, gender, notification, phoneNumber, address, city, postalCode });
      res.status(200).json({ success: true, message: 'User info updated successfully '})

  } catch (err) {
    next(err);
  }
});

router.put('/update-image', isAuthenticated,  async (req, res, next) => {
  const { email, imageUrl } = req.body;

  try {
    // Find the user by email
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
   
    await updateUser(email, { imageUrl });
      res.status(200).json({ success: true, message: 'Image upload successfully' })

  } catch (err) {
    next(err);
  }
});	

module.exports = router;