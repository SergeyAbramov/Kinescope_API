
const { test: base } = require('@playwright/test');
const { refreshAccessToken, isExpired } = require('../auth');

exports.test1 = base.extend({
  authedRequest: async ({ request }, use) => {
    const authedRequest = async (method, url, options = {}) => {
      // Ensure token is valid before request
      if (isExpired()) {
        console.log('Access token expired → refreshing...');
        await refreshAccessToken(process.env.BIGVU_REFRESH_TOKEN);
      }

      const send = async () => {
        const headers = {
          ...(options.headers || {}),
          Authorization: `Bearer ${process.env.BIGVU_ACCESS_TOKEN}`,
        };
        return request[method](url, { ...options, headers });
      };

      let response = await send();

      // Retry logic if token invalid / expired
      if (response.status() === 401 || response.status() === 403) {
        console.log(`Got ${response.status()} → refreshing token & retrying...`);
        await refreshAccessToken(process.env.BIGVU_REFRESH_TOKEN);
        response = await send();
      }

      return response;
    };

    await use(authedRequest);
  },
});