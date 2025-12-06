import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json';
import LoginPage from "../pages/LoginPage.js";
import ProfileUpdatePage from "../pages/ProfileUpdatePage.js";

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


test.describe("User can Upload Successfully", () => {


test("User can upload profile picture successfully and Then Do Logout", async () => {
    const uploadNewImg = new ProfileUpdatePage(page);
    await uploadNewImg.uploadProfileAndUpdate("./resources/Sample.jpg");
 
  });



});
