
1. Clone project from git > git clone https://github.com/SergeyAbramov/Kinescope_API.git
2. Open terminal in the project dir > npm install (maybe need to do it in sudo)
3. Select the desired installation option (browsers) > npx playwright install
4. Save in .env file your ADMIN_EMAIL, ADMIN_PASS (if for some reason tests wil fail try to hardcode credentials)
5. In terminal run the test > npx playwright test (run all the test from tests folder) >  npx playwright test payment_test.spec.js (run specific test) use --headed flag to run test in headed mode
6. Generate allure report > allure generate -c
7. Open allure reporter > allure open
