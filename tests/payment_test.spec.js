
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
    test('1. Проверка возможности залогиниться на тестовый стенд с корректными данными email/password', async ({ browser }) => {

        const context = await browser.newContext({
            httpCredentials: {
                username: 'fabrique',
                password: 'fabrique'
            }
        })
        const page = await context.newPage();

        await page.goto('https://finance.dev.fabrique.studio/accounts/login/');

        const LoginScreen = new fabriqueLoginScreen(page);
        
        await LoginScreen.loginWithAdminAccount(); 
        await expect(page.getByRole('link', { name: 'admin@admin.ad' })).toBeVisible();

    });
    test('2. Проверка возможности добавления тестового платежа', async ({ browser }) => {

        const context = await browser.newContext({
            httpCredentials: {
                username: 'fabrique',
                password: 'fabrique'
            }
        })
        const page = await context.newPage();

        await page.goto('https://finance.dev.fabrique.studio/accounts/login/');

        const LoginScreen = new fabriqueLoginScreen(page);
        
        await LoginScreen.loginWithAdminAccount(); 
        await expect(page.getByRole('link', { name: 'admin@admin.ad' })).toBeVisible();

        const MainScreen = new fabriqueMainScreen(page);
        const AddPaymentScreen = new fabriquePaymentScreen(page);

        await MainScreen.clickOnAddPaymentBtn();
        await expect(page.locator('//*[@class="pageLayout__header"]')).toHaveText('Добавить платёж'); 
        // Добавляем тестовый пллатёж, заполняем все поля формы
        await AddPaymentScreen.addNewIncomePayment();
        
        await page.screenshot({ path: './test-results/payment_screen.png', fullPage: true });
        
    });
    test('3. Проверка того, что созданный платёж содержит все ранее введённые данные', async ({ browser }) => {

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
        
        await LoginScreen.loginWithAdminAccount(); 
        await expect(page.getByRole('link', { name: 'admin@admin.ad' })).toBeVisible();
        // Ищем тестовый платёж
        await MainScreen.fillTheSearchInput();
        await expect(page.locator('tbody')).toContainText('Тестовое описание playwright');
        await MainScreen.clickOnTestPayment();
        await expect(page.locator('textarea[type="textarea"]').first()).toBeVisible();
        await expect(page.locator('input').first()).toBeVisible();
        await expect(page.getByText('приход').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Удалить' })).toBeVisible();
        // Удаляем тестовый платёж
        await MainScreen.deleteTestPayment();
        // Проверяем что тестовый платёж удалён
        await MainScreen.fillTheSearchInput();
        await expect(page.getByText('Нет данных')).toBeVisible();

    })
    test.skip('4. Проверка того что сохранённый ранее платёж можно удалить', async() => {


    })
})