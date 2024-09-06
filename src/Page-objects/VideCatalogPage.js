const { expect } = require('@playwright/test');

exports.VideoCatalogPagge = class VideoCatalogPage {

    constructor(page) {
        this.page = page;
        this.VIDEO_THREE_DOT_MENU = page.locator('._i1ytmm').first();
        this.DELETE_VIDEO_BTN = page.getByRole('button', { name: 'Удалить' })
        this.CONFIRM_DELETE_BTN = page.getByRole('button', { name: 'Удалить enter' });
        this.VIDEO_THREE_DOT_MENU_2 = page.locator('//*[@type="button"][@class="_i1ytmm  "]');
    }
    async deleteFirstVideo() {
        await this.VIDEO_THREE_DOT_MENU.click();
        await expect(this.DELETE_VIDEO_BTN).toBeVisible();
        await this.DELETE_VIDEO_BTN.click();
        await expect(this.CONFIRM_DELETE_BTN).toBeVisible();
        await this.CONFIRM_DELETE_BTN.click();
    }
    async deleteThirdVideo() {
        await this.VIDEO_THREE_DOT_MENU_2.click();
        await expect(this.DELETE_VIDEO_BTN).toBeVisible();
        await this.DELETE_VIDEO_BTN.click();
        await expect(this.CONFIRM_DELETE_BTN).toBeVisible();
        await this.CONFIRM_DELETE_BTN.click();
    }
    async deleteSecondVideo() {
        await this.VIDEO_THREE_DOT_MENU.click();
        await expect(this.DELETE_VIDEO_BTN).toBeVisible();
        await this.DELETE_VIDEO_BTN.click();
        await expect(this.CONFIRM_DELETE_BTN).toBeVisible();
        await this.CONFIRM_DELETE_BTN.click();
    }

}