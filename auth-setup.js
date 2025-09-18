
const { test: base } = require('@playwright/test');
require('dotenv').config();
const { refreshAccessToken } = require('./auth');

  async function authSetup() {
    let accessToken = process.env.BIGVU_ACCESS_TOKEN;
    let expiry = Number(process.env.ACCESS_TOKEN_EXPIRES_AT);

    // Refresh if expired or missing
    if (!accessToken || !expiry || Date.now() >= expiry) {
      console.log('Refreshing access token...');
      await refreshAccessToken(process.env.BIGVU_REFRESH_TOKEN);
    } else {
      console.log('Using valid access token from .env');
    }

  }

module.exports = authSetup;