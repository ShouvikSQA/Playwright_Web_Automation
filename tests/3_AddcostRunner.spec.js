import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json';
import LoginPage from "../pages/LoginPage.js";
import AddcostPage from "../pages/AddcostPage.js";

test.describe("User can add Item Successfully", () => {

    test.beforeEach(async ({ page }) => {

        const latestUser = jsonData[ jsonData.length - 1 ];
    
        await page.goto("/");
        const login = new LoginPage(page);
        await login.loginUser(latestUser.email , latestUser.password);
        await expect(page.getByText('Dashboard')).toBeVisible();
        
      });

test("User can Add product 1 successfully", async ({ page }) => {


    const addCost = new AddcostPage(page);

    await addCost.btnAddCost.click();
    await addCost.txtItemName.fill("Burger");
    await addCost.btnIncrement.click();
    await addCost.btnIncrement.click();
    await addCost.txtAmount.fill("1870");
    await addCost.txtPurchaseDate.fill("2024-02-14");
    await addCost.selectMonth.selectOption("February");
    await addCost.btnSubmit.click();

    await expect(addCost.btnAddCost).toBeVisible({ timeout: 40000 });
    
});

test("User can Add product 2 successfully", async ({ page }) => {


    const addCost = new AddcostPage(page);

    await addCost.btnAddCost.click();
    await addCost.txtItemName.fill("Pizza");
    await addCost.btnIncrement.click();
    await addCost.btnIncrement.click();
    await addCost.txtAmount.fill("1350");
    await addCost.txtPurchaseDate.fill("2024-09-11");
    await addCost.selectMonth.selectOption("September");
    await addCost.btnSubmit.click();
    await expect(addCost.btnAddCost).toBeVisible({ timeout: 40000 });

});

test("Assert Two Products Added Successfully", async ({ page }) => {

    await expect(page.locator('tbody')).toBeVisible({ timeout: 40000 });
    
    const countText =  page.locator("//div[@class='summary']/span");
    const rowCount = await countText.nth(0).innerText();
    expect(rowCount).toContain("2");
    
    
    

});


});