
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
                ['Authorization']: process.env.BIGVU_ACCESS_TOKEN, //Need to find the way to refresh token it expiers to quickly
                // https://api-dev.bigvu.tv/v0.5/oauth/token?grant_type=refresh_token&refresh_token=MFRRdUUwV05vMy9EQTBZS2RaQm45SXNXVGpjdmRPRU5XdHBsdExta1JoVmZtYzd5b1c1UC9QTXlsV1VYTFFleVFwRStlRGxpZDMwPQ%3D%3D

            }
        })
        const responseBody = JSON.parse(await response.text());
        const Id = responseBody.id;

        // if (response.status() === 401 || response.status() === 403) {
        //   await request.get('https://api-dev.bigvu.tv/v0.5/oauth/token?grant_type=refresh_token&refresh_token=MFRRdUUwV05vMy9EQTBZS2RaQm45SXNXVGpjdmRPRU5XdHBsdExta1JoVmZtYzd5b1c1UC9QTXlsV1VYTFFleVFwRStlRGxpZDMwPQ%3D%3D', {

        //     headers: {
        //       ['Content-type']: 'application/json',
        //       ['Authorization']: process.env.AUTHORIZATION_TOKEN,
        //     }
        //   })
        //   const responseBody = JSON.parse(await response.text());
        //   console.log(responseBody);
        // } else {          
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
/*
{
  id: '6284c667aef6296b28d4fb0b',
  type: 'organizationAdmin',
  status: 300,
  foreignUser: false,
  userId: '6284c667aef6296b28d4fb0b',
  email: 'sabr_test@yopmail.com',
  created: '2022-05-18T10:11:51.979Z',
  roles: [ 'presenter', 'writer' ],
  fullName: 'Sergey_Test',
  organizationId: '6284c667aef6296b28d4fb0c',
  organization: "Sergey's_Company.inc",
  providers: [
    { provider: 'bigvu', isAuthProvider: true, description: null },
    {
      externalId: 'UCHjYbGNifdWCssIVkwXm6mA',
      avatarUrl: 'https://yt3.ggpht.com/ytc/AOPolaRaKCs4o2xlrEGBjMA8sg9EPmm5qDAubFMa6Q=s800-c-k-c0x00ffffff-no-rj',
      description: null,
      displayName: 'Lipki Farm',
      followers: 32,
      provider: 'youtube',
      isAuthProvider: false,
      isLiveAvailable: true
    }
  ],
  profileImgAsset: {
    thumbnailUrl: 'https://assets-dev.bigvu.tv/image/68927d96be289402cc92db5f/thumb_360.jpg',
    url: 'https://assets-dev.bigvu.tv/image/68927d96be289402cc92db5f/asset.png',
    id: '68927d96be289402cc92db5f'
  },
  profileImgUrl: 'https://assets-dev.bigvu.tv/image/68927d96be289402cc92db5f/thumb_360.jpg',
  lang: 'en',
  phone: '+79267178829',
  industry: 'Sales',
  company: 'test_company',
  userAgent: [ 'android', 'web', 'ios' ],
  tags: [],
  isExpert: true,
  expertStatus: 'approved',
  lastVisit: '2025-09-17T14:12:35.618Z',
  hasForeignOrganizations: false,
  desks: [ 'Main', 'Test' ]
}
 */