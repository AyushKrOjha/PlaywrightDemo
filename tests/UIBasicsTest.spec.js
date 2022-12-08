const {test, expect} = require('@playwright/test');

test('browser playwright test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const pw = page.locator('#password');
    const signIn = page.locator('[type="submit"]');
    const cardTitles = page.locator('.card-body a');
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.type('rahulshettyacadem');
    await pw.type('learning');
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await Promise.all([
        page.waitForNavigation(),
        signIn.click()
    ]);
    

    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    const allContent = await cardTitles.allTextContents();
    console.log(allContent);
});

test('UI elements', async function({page}){
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator('[href*="documents-request"]');
    await dropdown.selectOption('consult');
    await page.locator('#usertype').nth(1).click();
    console.log(await page.locator('#usertype').nth(1).isChecked());
    await expect(page.locator('#usertype').nth(1)).toBeChecked();
    await page.locator('#okayBtn').click();
    await page.locator('#terms').click();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');
    // await page.pause();
});

test('Handeling Clild Window', async function({browser}){
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*="documents-request"]');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const email = (arrayText[1].split(' '))[0];
    console.log(email);
    await userName.type(email);
    await page.pause();
});
