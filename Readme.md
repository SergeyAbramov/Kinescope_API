
1. Clone project from git > git clone https://github.com/SergeyAbramov/Kinescope_API.git
2. Open terminal in the project dir > npm install (maybe need to do it in sudo)
3. Select the desired installation option (browsers) > npx playwright install
4. Save in .env file your KINESCOPE_EMAIL, KINESCOPE_PASS and
KINESCOPE_UPLOAD_TOKEN
5. Place test file in '/Users/Shared/' or change the filePath variable
6. In terminal run the test > npx playwright test (run all the test from tests folder) > npm test run api_video_upload_test.spec.js (run specific test)
7. Generate allure report > allure generate -c
8. Open allure reporter > allure open
