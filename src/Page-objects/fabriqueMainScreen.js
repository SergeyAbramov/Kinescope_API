const { expect } = require('@playwright/test');

exports.fabriqueMainScreen = class fabriqueMainScreen {

    constructor(page) {

        this.page = page;
        this.ADD_PAYMENT_BTN = page.getByRole('button', { name: 'Добавить платёж' });
        this.SEARCH_FIELD = page.getByPlaceholder('Поиск');
        this.TEST_PAYMENT = page.getByRole('cell', { name: 'Оплачен' }).locator('div');
        this.DELETE_BTN = page.getByRole('button', { name: 'Удалить' });
        this.DELETE_POP_UP = page.getByRole('heading', { name: 'Вы уверены, что хотите удалить этот платеж?' });
        this.YES_BTN = page.getByRole('button', { name: 'Да' });
        this.DELETE_SUCCESS_PROMPT = page.getByText('Платеж успешно удалён');
    
    }
    async clickOnAddPaymentBtn(){

        await this.ADD_PAYMENT_BTN.click(); 

    }
    async fillTheSearchInput(){

        await this.SEARCH_FIELD.click();
        await this.SEARCH_FIELD.fill('play');
        await this.SEARCH_FIELD.press('Enter');
        await this.SEARCH_FIELD.press('Enter');
    }
    async clickOnTestPayment(){

        await this.TEST_PAYMENT.click();

    }
    async deleteTestPayment(){
        await this.DELETE_BTN.click();
        await expect(this.DELETE_POP_UP).toBeVisible();
        await expect(this.YES_BTN).toBeVisible();
        await this.YES_BTN.click();
        await expect(this.DELETE_SUCCESS_PROMPT).toBeVisible();
    } 
}