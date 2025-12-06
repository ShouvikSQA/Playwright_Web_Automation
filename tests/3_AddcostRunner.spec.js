import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json';
import LoginPage from "../pages/LoginPage.js";
import AddcostPage from "../pages/AddcostPage.js";


let page;    

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("/");
  const latestUser = jsonData[ jsonData.length - 1 ];
  const login = new LoginPage(page);
  await login.loginUser(latestUser.email , latestUser.password);
  await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 40000 });

  
});
test.afterAll(async () => {
  await page.close();
});




test.describe("User can add Item Successfully", () => {


test("User can Add product 1 successfully", async () => {


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

test("User can Add product 2 successfully", async () => {


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

test("Assert Two Products Added Successfully", async () => {

    await expect(page.locator('tbody')).toBeVisible({ timeout: 40000 });
    
    const countText =  page.locator("//div[@class='summary']/span");
    const rowCount = await countText.nth(0).innerText();
    expect(rowCount).toContain("2");
    
    
    

});


});