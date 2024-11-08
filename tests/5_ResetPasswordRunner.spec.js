import { test, expect, request } from "@playwright/test";
import jsonData from '../Utils/userData.json';
import ResetPassPage from "../pages/ResetPassPage.js";
import {fetchEmail} from '../Utils/utils.js'
import LoginPage from "../pages/LoginPage.js";

const latestUser = jsonData[ jsonData.length - 1 ];
const newPass = "12345";

test.describe("User can  Reset Password", () => {
    test("User can reset Password successfully ", async ({ page }) => {
        
        
        page.goto("/");

        const reset = new ResetPassPage(page);
        await reset.resetLink.click();
        await reset.txtEmail.fill(latestUser.email);
        await reset.btnSendReset.click();
        await expect(reset.emailSentConfrim).toBeVisible({ timeout: 40000 });
        
        await page.waitForTimeout(4000); // For email receiving time 

        const latestEmail = await fetchEmail();
        console.log(latestEmail);

        const splitArray = latestEmail.split(": ");
        const resetLink = splitArray[1];
       //  console.log(splitArray[1]);
        page.goto(resetLink);
       
        await reset.txtNewPass.fill(newPass);
        await reset.txtConfirmPass.fill(newPass);

    
        await reset.btnResetPass.click();
        await expect(page.getByText('Password reset successfully')).toBeVisible({ timeout: 60000 });

       

        
    });

    test("Login With new Password Successfully ", async ({ page }) => {
                // Login With new Password
                page.goto("/");
                const login = new LoginPage(page);
                await login.loginUser(latestUser.email , newPass);
                await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 40000 });

    });

    test("User can not reset Password with alreay used link  ", async ({ page }) => {
        
        
        const reset = new ResetPassPage(page);
        const latestEmail = await fetchEmail();
        console.log(latestEmail);

        const splitArray = latestEmail.split(": ");
        const resetLink = splitArray[1];
       //  console.log(splitArray[1]);
        page.goto(resetLink);
       
        await reset.txtNewPass.fill(newPass);
        await reset.txtConfirmPass.fill(newPass);

    
        await reset.btnResetPass.click();
        await expect(page.getByText('Error resetting password')).toBeVisible({ timeout: 40000 });

       

        
    });

      test("User can not reset Password with unregistered Email", async ({ page }) => {
        
        
        page.goto("/");

        const reset = new ResetPassPage(page);
        await reset.resetLink.click();
        await reset.txtEmail.fill("hdwdwebwb95109@gmail.com");
        await reset.btnSendReset.click();        

        await expect(page.getByText('Your email is not registered')).toBeVisible({ timeout: 40000 });

       

        
    });

        test("User can not reset Password when password and confirm password mismatches ", async ({ page }) => {
        
        
        page.goto("/");

        const reset = new ResetPassPage(page);
        await reset.resetLink.click();
        await reset.txtEmail.fill(latestUser.email);
        await reset.btnSendReset.click();
        await expect(reset.emailSentConfrim).toBeVisible({ timeout: 60000 });
        
        await page.waitForTimeout(4000); // For email receiving time 

        const latestEmail = await fetchEmail();
        console.log(latestEmail);

        const splitArray = latestEmail.split(": ");
        const resetLink = splitArray[1];
       //  console.log(splitArray[1]);
        page.goto(resetLink);
       
        await reset.txtNewPass.fill(newPass);
        await reset.txtConfirmPass.fill("98766");

    
        await reset.btnResetPass.click();
        await expect(page.getByText('Passwords do not match')).toBeVisible({ timeout: 40000 });

       

        
    });

});