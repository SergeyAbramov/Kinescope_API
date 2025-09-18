
import { test, expect, request } from '@playwright/test';
require('dotenv').config();

test.describe('@refresh_token.spec.js @DEV Test that we can refresh token via API', async() => {
    test('1. Test that GET request wil get te correct data from API', async ({ request }) => {


        const response = await request.get('https://api-dev.bigvu.tv/v0.5/oauth/token?grant_type=refresh_token&refresh_token=MFRRdUUwV05vMy9EQTBZS2RaQm45SXNXVGpjdmRPRU5XdHBsdExta1JoVmZtYzd5b1c1UC9QTXlsV1VYTFFleVFwRStlRGxpZDMwPQ%3D%3D', {
            
            headers: {
                ['Content-type']: 'application/json',
                ['Authorization']: process.env.AUTHORIZATION_TOKEN,
            }
        
        });
        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);   
    });

})