import { test, expect } from '@playwright/test';
import { LoginScreen } from '../src/Page-objects/LoginScreen';
import { VideoCatalogPagge } from '../src/Page-objects/VideCatalogPage';
const fs = require('fs');
require('dotenv').config();



test.describe('@api_video_upload_test.spec.js Test that user is able to upload sample file via API', async () => {

    test.use({
        viewport: {
            height: 950,
            width: 1920
        }
    });

    test('1. @get-the-project-id Test that user is able to get the project id', async ({ request }) => {

        const response = await request.get('https://api.kinescope.io/v1/projects', {
            headers: {
                // Запрос списка проектов
                ['Content-type']: 'application/json',
                ['Authorization']: process.env.KINESCOPE_UPLOAD_TOKEN,
    
            },
        })
        const responseBody = JSON.parse(await response.text());
        const projectId = responseBody.data[0].id;
        expect(response.status()).toBe(200);
        expect(responseBody.data[0].name).toBe('Demo project'),
        expect(projectId).toBe('72992eb8-d823-4446-84e5-7fe0d488c955'),
        console.log(responseBody);
        
    });

    test('2. @link_upload Test that user is able to get the upload link', async ({ request }) => {

        const filePath = '/Users/Shared/Big_Buck_Bunny_1080_10s_1MB.mp4';
        const fileContent = fs.readFileSync(filePath);

            const response = await request.post('https://uploader.kinescope.io/v2/init', {
                headers: {

                    ['Content-Type']: 'application/json',
                    ['Authorization']: process.env.KINESCOPE_UPLOAD_TOKEN,
                                 
                },

                data: {
                "filesize": 1,
                "type": "video",
                "title": "Uploaded_via_link_video",
                "parent_id": "72992eb8-d823-4446-84e5-7fe0d488c955",
                "filename": "Big_Buck_Bunny_1080_10s_1MB.mp4",
                "description": "Video uploaded via API by link",
                "client_ip": "188.32.166.106",
            },
            })
            
            const responseBody = JSON.parse(await response.text()); 
            const endpoint = responseBody.data.endpoint;                                      
            console.log(endpoint);

            await request.post(endpoint, {

                data: fileContent
                
            })
            
            console.log(responseBody);
            console.log(response.status());
            
        });
    test('3. @one_request_upload Test that user is able upload video by one request', async ({ request }) => {
        
        const filePath = '/Users/Shared/Big_Buck_Bunny_1080_10s_1MB.mp4';
        const fileContent = fs.readFileSync(filePath);

        const response = await request.post('https://uploader.kinescope.io/v2/video', {
                headers: {

                    ['Authorization']: process.env.KINESCOPE_UPLOAD_TOKEN,
                    ['X-Parent-ID']: '72992eb8-d823-4446-84e5-7fe0d488c955',
                    ['X-Video-Title']: 'Uploaded_by_one_request_video',
                    ['X-Video-Description']: 'My first uploaded video via API',
                    ['X-File-Name']: 'Big_Buck_Bunny_1080_10s_1MB.mp4',
                    ['Content-type']: 'video/mp4',
                    
                },

                data: fileContent
                
            })
            
            const responseBody = JSON.parse(await response.text()); 
            expect(response.status()).toBe(200);
            console.log(responseBody);
            console.log(response.status());
            
        });
        
        test.skip('4. @upload_via_url Test that user is able upload video by URL', async ({ request }) => {
            const response = await request.post('https://uploader.kinescope.io/v2/video', {

                headers: {

                    ['Authorization']: process.env.KINESCOPE_UPLOAD_TOKEN,
                    ['X-Parent-ID']: '72992eb8-d823-4446-84e5-7fe0d488c955',
                    ['X-Video-Title']: 'Video from YouTube',
                    ['X-Video-Description']: 'My first uploaded video via API',
                    ['X-Video-URL']: 'https://youtu.be/ExMFsKn5VFM?si=QzrgX4zA26je7jqS', 
                    
                },
    
            })
            
            const responseBody = JSON.parse(await response.text()); 
            expect(response.status()).toBe(200);
            console.log(responseBody);
            console.log(response.status());
            
        });

    test('4. @admin_upload_check That the video uploaded via API is shown in the admin panel, Delete uploaded files', async({ page }) => {

        const LoginPage = new LoginScreen(page);
        const VideoCatalog = new VideoCatalogPagge(page);

        await page.goto('https://app.kinescope.io');
        await expect(page).toHaveTitle('Kinescope');
        await LoginPage.enterWithEmailAndPassword();
        await expect(page.locator('//*[@class="_1qjuu86  "]')).toContainText('Каталог');
        await expect(page.locator('#dashboard-app')).toContainText('Demo project');
        await expect(page.locator('#dashboard-app')).toContainText('Uploaded_by_one_request_video');
        await expect(page.locator('#dashboard-app')).toContainText('Uploaded_via_link_video');
        await expect(page.locator('#dashboard-app')).toContainText('объекта • 11.03 MB');
        await VideoCatalog.deleteFirstVideo();
        await VideoCatalog.deleteSecondVideo();
        await expect(page.locator('#dashboard-app')).toContainText('Нет объектов • 0 B');
        await expect(page.locator('#dashboard-app')).toContainText('Загрузить файлы');

    })
    });
