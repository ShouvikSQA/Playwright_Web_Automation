import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json';
import LoginPage from "../pages/LoginPage.js";
import ProfileUpdatePage from "../pages/ProfileUpdatePage.js";

test.describe("User can Upload Successfully", () => {

    test.beforeEach(async ({ page }) => {
        const latestUser = jsonData[ jsonData.length - 1 ];
    
        await page.goto("/");
        const login = new LoginPage(page);
        await login.loginUser(latestUser.email , latestUser.password);
        await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 40000 });
      });

test("User can upload profile picture successfully and Then Do Logout", async ({ page }) => {
    const uploadNewImg = new ProfileUpdatePage(page);
    await uploadNewImg("./resources/Sample.jpg");
 
  });



 

});
