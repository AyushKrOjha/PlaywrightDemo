const {text, expect, default: test} = require('@playwright/test');

test('more validations', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.pause();

    //Java Popup
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();

    const framePgae = page.frameLocator('#courses-iframe');
    await framePgae.getByRole('link', {name: 'All Access plan'}).click();
    const num = await framePgae.locator('.text h2').textContent();
    console.log(num);
})