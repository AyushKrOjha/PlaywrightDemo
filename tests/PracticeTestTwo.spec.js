const {test, expect} = require('@playwright/test');

test.only('End to End Test', async ({browser})=>{
    const mail = 'boweme9577@cosaxu.com';
    const productName = 'adidas original';
    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill(mail);
    await page.getByPlaceholder('enter your passsword').fill('Ojha@239');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').allTextContents();

    const count = await products.count();
    // console.log(count);
    for(let i = 0; i < count; ++i){
        if (await products.nth(i).locator('b').textContent() == productName){
            await products.nth(i).getByRole('button', { name: '  Cart ' }).click();
            break;
        }
    }

    await page.getByRole('button', { name: '  Cart ' }).first().click();
    await page.locator('div li').first().waitFor();
    await expect(page.getByText('adidas original')).toBeVisible();

    await page.getByRole('button', {name: 'Checkout'}).click();

    await page.locator('input[type="text"]').nth(1).type('123');
    await page.locator('input[type="text"]').nth(2).type('Ayush Ojha');
    await page.getByPlaceholder('Select Country').type('ind', {delay: 100});
    const dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();
    const counts = await dropdown.locator('button').count();
    // console.log(counts);
    for(let i=0; i < counts; i++){
        await dropdown.getByRole('button', {name: ' India'}).nth(1).click();
        break;
    }
    await expect(page.locator('.details__user .user__name label')).toHaveText(mail);
    await page.locator('.details__user .action__submit').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    // console.log(orderId);
    await page.getByRole('button', {name: '  ORDERS'}).click();
    const rows = await page.locator('tbody tr');
    await rows.nth(1).waitFor();
    for (let i = 0; i < await rows.count() ; i++){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).getByRole('button', {name: 'View'}).click();
            break;
        }
    }

    await page.locator('.col-text').waitFor();
    const orderDetail = await page.locator('.col-text').textContent();
    const bool2 = orderId.includes(orderDetail);
    await expect(bool2).toBeTruthy();
})