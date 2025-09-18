
const fs = require('fs');
const path = require('path');
import { test, expect, request } from '@playwright/test';
require('dotenv').config();

test.describe('@refresh_token.spec.js @DEV Test that we can refresh token via API', async () => {
    test.skip('1. Refresh token', async ({ request }) => {

        const response = await request.get('https://api-dev.bigvu.tv/v0.5/oauth/token?grant_type=refresh_token&refresh_token=MFRRdUUwV05vMy9EQTBZS2RaQm45SXNXVGpjdmRPRU5XdHBsdExta1JoVmZtYzd5b1c1UC9QTXlsV1VYTFFleVFwRStlRGxpZDMwPQ%3D%3D', {

            headers: {
                ['Content-type']: 'application/json',
                ['Authorization']: process.env.AUTHORIZATION_TOKEN,
            }

        });
        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);

        if (!response.ok) {
            throw new Error(`Token refresh failed: ${response.status}`);
        }

        const envPath = path.resolve(__dirname, '..', '.env');
        const data = await response.json();

        const newAccessToken = data.access_token;
        const newRefreshToken = data.refresh_token;
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
    });
           
    test('2. Test that GET request wil get te correct data about account from API', async ({ request }) => {
 
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
    
    });

    test('3. Test that GET request wil get te correct data about user list from API', async ({ request }) => {

        const response = await request.get('https://api-dev.bigvu.tv/v0.5/account/list', {
            
            headers: {
                ['Content-type']: 'application/json',
                ['Authorization']: process.env.BIGVU_ACCESS_TOKEN,
            }
        })
        const responseBody = JSON.parse(await response.text());
        const Id = responseBody.id;
         
        expect(response.status()).toBe(200);
        expect(responseBody.result[0].id).toBe('62e123b4dfc13a292fabc03a'),
        expect(responseBody.result[0].type).toBe('organizationAdmin');
        expect(responseBody.result[0].email).toBe('sabr_test+first@yopmail.com');
        expect(responseBody.result[1].id).toBe('6284c667aef6296b28d4fb0b'),
        expect(responseBody.result[1].type).toBe('organizationAdmin');
        expect(responseBody.result[1].email).toBe('sabr_test@yopmail.com');
        
        console.log(responseBody);
    
    })

})