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

    const costObject = {
    itemName: "Burger",
    incrementClicks: 2,        
    amount: "1870",
    purchaseDate: "2024-02-14",
    month: "February"

  }

  await addCost.addCost(costObject);

    
});

test("User can Add product 2 successfully", async ({ page }) => {


    const addCost = new AddcostPage(page);


    const costObject = {
        itemName: "Pizza",
        incrementClicks: 2,
        amount: "1350",
        purchaseDate: "2024-09-11",
        month: "September"
    }

   await addCost.addCost(costObject);

     

});

test("Assert Two Products Added Successfully", async ({ page }) => {

    await expect(page.locator('tbody')).toBeVisible({ timeout: 40000 });
    
    const countText =  page.locator("//div[@class='summary']/span");
    const rowCount = await countText.nth(0).innerText();
    expect(rowCount).toContain("2");
    
    
    

});


});