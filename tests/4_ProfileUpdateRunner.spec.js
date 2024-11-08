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

    await uploadNewImg.btnUserAccount.click();
    await uploadNewImg.btnProfile.click();
    await uploadNewImg.btnEdit.click();
    await uploadNewImg.btnChooseFile.setInputFiles("./resources/Sample.jpg");
    
    const alertMessages = []
    page.on('dialog', async dialog => {
      alertMessages.push(dialog.message());
      await dialog.accept();

    });
    await uploadNewImg.btnUploadImage.click();

   // await page.waitForTimeout(3000);
   await page.waitForEvent('dialog');
  
   await page.waitForTimeout(1000);

    await uploadNewImg.btnUpdate.click();
 //   await page.waitForTimeout(3000);
   await page.waitForEvent('dialog');
   
  expect(alertMessages[0]).toBe('Image uploaded successfully!');
  expect(alertMessages[1]).toBe('User updated successfully!');
  
  await page.getByLabel("account of current user").click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 40000 });
   
  });



 

});
