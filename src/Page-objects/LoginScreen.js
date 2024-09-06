const { expect } = require('@playwright/test');
require('dotenv').config();

exports.LoginScreen = class LoginScreen {

    constructor(page) {
        this.page = page;
        this.EMAIL_FIELD = page.getByPlaceholder('Почта');
        this.PASSWORD_FIELD = page.getByPlaceholder('Пароль');
        this.ENTER_BTN = page.getByRole('button', { name: 'Войти', exact: true });

    }
    async enterWithEmailAndPassword(){
        await this.EMAIL_FIELD.click();
        await this.EMAIL_FIELD.fill(process.env.KINESCOPE_EMAIL);
        await this.PASSWORD_FIELD.click();
        await this.PASSWORD_FIELD.fill(process.env.KINESCOPE_PASS);
        await this.ENTER_BTN.click();
    }
}