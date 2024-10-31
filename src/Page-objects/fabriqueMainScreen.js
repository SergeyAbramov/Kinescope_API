const { expect } = require('@playwright/test');

exports.fabriqueMainScreen = class fabriqueMainScreen {

    constructor(page) {

        this.page = page;
        this.ADD_PAYMENT_BTN = page.getByRole('button', { name: 'Добавить платёж' });
    
    }
    async clickOnAddPaymentBtn(){
        
        await this.ADD_PAYMENT_BTN.click();
        
    }
}