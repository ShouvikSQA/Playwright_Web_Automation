import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json';
import LoginPage from "../pages/LoginPage.js";

const latestUser = jsonData[ jsonData.length - 1 ];

test.describe("User Login", () => {

test("User can Log in successfully", async ({ page }) => {



    await page.goto("/");
    const login = new LoginPage(page);
    await login.loginUser(latestUser.email , latestUser.password);
    await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 40000 });

});

test("User can not Log in With Invalid Email", async ({ page }) => {

    await page.goto("/");
    const login = new LoginPage(page);
    await login.loginUser("ahwuw2923@getMaxListeners.com" , latestUser.password);
    await expect(page.getByText('Invalid email or password')).toBeVisible({ timeout: 40000 });
    

});

test("User can not Log in With Invalid Password", async ({ page }) => {

    await page.goto("/");
    const login = new LoginPage(page);
    await login.loginUser(latestUser.email , "12345");
    await expect(page.getByText('Invalid email or password')).toBeVisible({ timeout: 40000 });
    

});

});

