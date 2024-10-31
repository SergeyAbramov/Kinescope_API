
import { test, expect } from '@playwright/test';
import { fabriqueLoginScreen } from '../src/Page-objects/fabriqueLoginScreen.js';
import { fabriqueMainScreen } from '../src/Page-objects/fabriqueMainScreen.js';
import { fabriquePaymentScreen } from '../src/Page-objects/fabriquePaymentScreen.js';
require('dotenv').config();


test.describe('Тест страницы платежи', async () => {

    // Задаём желаемые параметры теста например viewport
    test.use({
        viewport: {
            height: 950,
            width: 1920
        }
    });
    test('1. Тест возможности залогиниться на тестовый стенд с корркетными учётками', async ({ browser }) => {


        const context = await browser.newContext({
            httpCredentials: {
                username: 'fabrique',
                password: 'fabrique'
            }
        })
        const page = await context.newPage();
        await page.goto('https://finance.dev.fabrique.studio/accounts/login/');

        const LoginScreen = new fabriqueLoginScreen(page);
        const MainScreen = new fabriqueMainScreen(page);
        const AddPaymentScreen = new fabriquePaymentScreen(page);

        await LoginScreen.loginWithAdminAccount(); 
        await expect(page.getByRole('link', { name: 'admin@admin.ad' })).toBeVisible();
        //add income payment
        await MainScreen.clickOnAddPaymentBtn();
        await expect(page.locator('//*[@class="pageLayout__header"]')).toHaveText('Добавить платёж');

        await AddPaymentScreen.addNewIncomePayment();
        
        await page.screenshot({ path: './test-results/payment_screen.png', fullPage: true });
        


    })
    test.skip('2. Тест возможности добавления платежа', async ({ page }) => {

        /*
        test('test', async ({ page }) => {
          
          await page.locator('div:nth-child(2) > .form-field__field > .checkbox > .checkbox__content > .checkbox__icon').first().click();
          await page.locator('div:nth-child(3) > .form-field__field > .checkbox > .checkbox__content > .checkbox__icon').first().click();
          await page.locator('textarea[type="textarea"]').first().click();
          await page.locator('textarea[type="textarea"]').fill('Тестовое описание');
          await page.locator('.checkbox__icon > div > .icon').first().click();
          await page.getByText('Проверен').click();
          await page.locator('input').first().click();
          await page.locator('div:nth-child(2) > .form-field__field > .checkbox > .checkbox__content > .checkbox__icon').first().click();
          await page.locator('.checkbox__icon').first().click();
          await page.locator('input').first().click();
          await page.locator('input').first().fill('5000');
          await page.locator('div:nth-child(5) > div > div:nth-child(2) > div > div > .form-field > .form-field__field > .input > .input__content > .input__input').click();
          await page.locator('div:nth-child(5) > div > div:nth-child(2) > div > div > .form-field > .form-field__field > .input > .input__content > .input__input').fill('5000');
          await page.getByText('Оплачен', { exact: true }).click();
          await page.locator('.date__input').first().click();
          await page.getByRole('button', { name: '10' }).first().click();
          await page.locator('div:nth-child(9) > div > div:nth-child(2) > div > div > .form-field > .form-field__field > .date > .date__content > .date__input').click();
          await page.getByRole('button', { name: '31' }).click();
          await page.locator('.multiselect__placeholder').first().click();
          await page.getByText('1894').click();
          await page.locator('textarea[type="textarea"]').nth(1).click();
          await page.locator('textarea[type="textarea"]').nth(1).fill('Тест');
          await page.locator('.multiselect__placeholder').first().click();
          //*[@id="idumk2p"]/div/div[12]/div/div[2]/div/div/div/div/div/div/div[2]/input
          //#idumk2p > div > div:nth-child(12) > div > div:nth-child(2) > div > div > div > div > div > div > div.multiselect__tags > input
          #idumk2p > div > div:nth-child(12) > div > div:nth-child(2) > div > div > div > div > div > div > div.multiselect__tags > span
          await page.getByText('Счет выставлен').click();
          await page.getByText('Выберите').first().click();
          await page.locator('div:nth-child(15) > div:nth-child(2) > div:nth-child(2) > div > div > .form-field > .form-field__field > .select > .multiselect > .multiselect__tags > .multiselect__input').fill('ооо');
          await page.getByText('ООО "Тест"').click();
          await page.getByText('Выберите').first().click();
          await page.locator('form').getByRole('list').locator('span').filter({ hasText: '123' }).first().click();
          await page.getByText('Выберите').first().click();
          await page.locator('form').getByRole('list').getByText('050392').click();
          await page.getByText('Выберите').first().click();
          await page.locator('form').getByRole('list').getByText('050392').click();
          await page.getByText('Выберите').click();
          await page.getByText('приход', { exact: true }).click();
          await page.getByRole('button', { name: 'Добавить' }).click();
          await expect(page.getByText('Платеж успешно сохранен')).toBeVisible();
          */
    });
})