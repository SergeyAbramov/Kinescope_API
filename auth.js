const fs = require('fs');
const path = require('path');
require('dotenv').config();

const envPath = path.resolve(__dirname, '..', '.env');

async function refreshAccessToken(refreshToken) {

  const resp = await fetch(
    `https://api-dev.bigvu.tv/v0.5/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`,{ 
      
      method: 'GET',
      headers: {
        ['Content-type']: 'application/json',
        ['Authorization']: process.env.AUTHORIZATION_TOKEN,
      }
     }
  );

  if (!resp.ok) {
    throw new Error(`Token refresh failed: ${resp.status}`);
  }

  const data = await resp.json();

  const newAccessToken = data.access_token;
  const newRefreshToken = data.refresh_token || refreshToken;
  const newExpiry = Date.now() + data.expires_in * 1000;

  // Update process.env
  process.env.BIGVU_ACCESS_TOKEN = newAccessToken;
  process.env.BIGVU_REFRESH_TOKEN = newRefreshToken;
  process.env.ACCESS_TOKEN_EXPIRES_AT = String(newExpiry);

  // Rewrite .env file
  const newEnv = [
    `BIGVU_ACCESS_TOKEN = Bearer ${newAccessToken}`,
    `BIGVU_REFRESH_TOKEN = ${newRefreshToken}`,
    `ACCESS_TOKEN_EXPIRES_AT = ${newExpiry}`,
    `AUTHORIZATION_TOKEN = Basic UnpxdXd1NmNBTlRnVDRYZURIRnczSUxq`
  ].join('\n');

  fs.writeFileSync(envPath, newEnv, { encoding: 'utf8' });

  return newAccessToken;
}
function isExpired() {
  const expiry = Number(process.env.BIGVU_ACCESS_TOKEN_EXPIRES_AT);
  return !expiry || Date.now() >= expiry;
}

module.exports = { refreshAccessToken, isExpired };