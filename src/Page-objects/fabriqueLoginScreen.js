const { expect } = require('@playwright/test');
require('dotenv').config();

exports.fabriqueLoginScreen = class fabriqueLoginScreen {

    constructor(page) {
        this.page = page;
        this.EMAIL_FIELD = page.getByPlaceholder('Электронная почта');
        this.PASS_FIELD = page.getByPlaceholder('Пароль');
        this.CONTINUE_BTN = page.getByRole('button', { name: 'Далее' });
    }
    async loginWithAdminAccount() {
        await this.EMAIL_FIELD.click();
        await this.EMAIL_FIELD.fill('admin@admin.ad');
        await this.PASS_FIELD.click();
        await this.PASS_FIELD.fill('admin');
        await this.CONTINUE_BTN.click();
    }
}