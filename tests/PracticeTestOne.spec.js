const {test, expect} = require('@playwright/test');

test('Practice Test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('boweme9577@cosaxu.com');
    await page.locator('#userPassword').fill('Ojha@239');
    await page.locator('.btn.btn-block.login-btn').click();

    await page.waitForLoadState('networkidle');
    const titles = await page.locator('.card-body h5 b').allTextContents();
    console.log(titles);
});