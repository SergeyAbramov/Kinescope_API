
import { test, expect, request } from '@playwright/test';
const { test1 } = require ('./fixtures');
const fs = require('fs');
require('dotenv').config();

test.describe('@bigvu_api_get_user.spec.js @DEV Test that we can get the user list via API', async() => {

    test1('API auto-refresh on expired token', async ({ authedRequest }) => {
      const res = await authedRequest('get', 'https://api-dev.bigvu.tv/v0.5/account');
      expect(res.status()).toBe(200);
    });

    test('1. Test that GET request wil get te correct data from API', async ({ request }) => {

        const response = await request.get('https://api-dev.bigvu.tv/v0.5/account', {
            
            headers: {
                ['Content-type']: 'application/json',
                ['Authorization']: process.env.BIGVU_ACCESS_TOKEN, 
            }
        })
        const responseBody = JSON.parse(await response.text());
        const Id = responseBody.id;
         
        expect(response.status()).toBe(200);
        expect(Id).toBe('6284c667aef6296b28d4fb0b'),
        expect(responseBody.type).toBe('organizationAdmin');
        expect(responseBody.email).toBe('sabr_test@yopmail.com');
        expect(responseBody.roles[0]).toBe('presenter');
        expect(responseBody.providers[1].externalId).toBe('UCHjYbGNifdWCssIVkwXm6mA');
        console.log(responseBody);
        //}
    })
})