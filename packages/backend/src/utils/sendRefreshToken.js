function sendRefreshToken(res, token) {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      sameSite: true,
        path: '/api/auth',
        //path: '/',
    });
  }
  
  module.exports = { sendRefreshToken };