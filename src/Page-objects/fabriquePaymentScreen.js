const { expect } = require('@playwright/test');

exports.fabriquePaymentScreen = class fabriquePaymentScreen {

    constructor(page) {
        this.page = page;
        this.INCOME_CHECKMARK = page.locator('div:nth-child(1) > .form-field__field > .checkbox > .checkbox__content > .checkbox__icon').first();
        this.EXPENCE_CHECKMARK = page.locator('div:nth-child(2) > .form-field__field > .checkbox > .checkbox__content > .checkbox__icon').first();
        this.TRANSACTIONS_CHECKMARK = page.locator('div:nth-child(3) > .form-field__field > .checkbox > .checkbox__content > .checkbox__icon').first();
        this.DESCRIPTION_FIELD = page.locator('textarea[type="textarea"]').first();
        this.ACTIVE_STATUS = page.locator('.checkbox__icon > div > .icon').first();
        this.CHECKED_STSTUS = page.getByText('Проверен');
        this.PLAN_AMMOUNT_INPUT = page.locator('input').first();
        this.ACTUAL_AMMOUNT_INPUT = page.locator('div:nth-child(5) > div > div:nth-child(2) > div > div > .form-field > .form-field__field > .input > .input__content > .input__input');
        this.PAYMENT_STATUS_NOT_PAYED = page.getByText('Не оплачен', { exact: true });
        this.PAYMENT_STATUS_PAYED = page.getByText('Оплачен', { exact: true });
        this.PLAN_DATE = page.locator('.date__input').first();
        this.DATE_10 = page.getByRole('button', { name: '10' }).first().click();
        this.ACTUAL_DATE = page.locator('div:nth-child(9) > div > div:nth-child(2) > div > div > .form-field > .form-field__field > .date > .date__content > .date__input');
        this.DATE_31 = page.getByRole('button', { name: '31' });
        this.PAYMENT_REASON_DROP_DOWN = page.locator('.multiselect__placeholder').first();
        this.FIRST_PAYMENT_REASON = page.getByText('1894');
        this.PAYMENT_REASON_TEXT_INPUT = page.locator('textarea[type="textarea"]').nth(1);
        this.DOC_STATUS_DROP_DOWN = page.getByText('Выберите').first();
        this.DOC_STATUS_FIRST = page.getByText('Счет выставлен');
        this.UL_DROP_DOWN = page.getByText('Выберите').first();
        this.UL_SELECT = page.locator('form').getByRole('list').getByText('drop table');
        this.PARTNER_DROP_DOWN = page.getByText('Выберите').first();
        this.PARTNER_SELECT = page.locator('form').getByRole('list').locator('span').filter({ hasText: 'Контрагент 1' }).first();
        this.SENDER_ACCOUNT = page.getByText('Выберите').first();
        this.SENDER_ACCOUNT_SELECT = page.locator('form').getByRole('list').getByText('050392');
        this.RECIPIENT_DROP_DOWN = page.getByText('Выберите').first();
        this.RECIPIENT_SELECT = page.locator('form').getByRole('list').getByText('112342342');
        this.TAGS_DROP_DOWN = page.getByText('Выберите');
        this.TAG_SELECT = page.getByText('приход', { exact: true });
        this.ADD_BTN = page.getByRole('button', { name: 'Добавить' });
        this.SUCCESSS_PROMPT = page.getByText('Платеж успешно сохранен');
        this.DELETE_BTN = page.getByRole('button', { name: 'Удалить' });
        
    }
    async addNewIncomePayment() {

        await this.EXPENCE_CHECKMARK.click();
        await this.INCOME_CHECKMARK.click();
        await this.DESCRIPTION_FIELD.click();
        await this.DESCRIPTION_FIELD.fill('Тестовое описание playwright');
        await this.ACTIVE_STATUS.click();
        await this.CHECKED_STSTUS.click();
        await this.PLAN_AMMOUNT_INPUT.click();
        await this.PLAN_AMMOUNT_INPUT.fill('5000');
        await this.ACTUAL_AMMOUNT_INPUT.click();
        await this.ACTUAL_AMMOUNT_INPUT.fill('5000');
        await this.PAYMENT_STATUS_PAYED.click();
        await this.PLAN_DATE.click();
        await this.ACTUAL_DATE.click();
        await this.DATE_31.click();
        await this.PAYMENT_REASON_DROP_DOWN.click();
        await this.FIRST_PAYMENT_REASON.click();
        await this.PAYMENT_REASON_TEXT_INPUT.click();
        await this.PAYMENT_REASON_TEXT_INPUT.fill('Тест');
        await this.DOC_STATUS_DROP_DOWN.click();
        await this.DOC_STATUS_FIRST.click();
        await this.UL_DROP_DOWN.click();
        await expect(this.UL_SELECT).toBeVisible();
        await this.UL_SELECT.click();
        await this.PARTNER_DROP_DOWN.click();
        await this.PARTNER_SELECT.click();
        await this.SENDER_ACCOUNT.click();
        await this.SENDER_ACCOUNT_SELECT.click();
        await this.RECIPIENT_DROP_DOWN.click();
        await this.RECIPIENT_SELECT.click();
        await this.TAGS_DROP_DOWN.click();
        await this.TAG_SELECT.click();
        await this.ADD_BTN.click();
        await expect(this.SUCCESSS_PROMPT).toBeVisible();

    }
}