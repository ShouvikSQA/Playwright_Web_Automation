import { test, expect } from "@playwright/test";
import jsonData from '../Utils/userData.json'  //assert { type: 'json' };
import RegistrationPage from "../pages/RegistrationPage.js";
import fs from 'fs'
import { faker } from '@faker-js/faker';
import {generateRandomId,getNewEmail,fetchEmail} from '../Utils/utils.js'
import dotenv from 'dotenv';
dotenv.config();








test.describe("User can Register Successfully", () => {

test("User can register successfully", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Welcome to daily finance" })
    ).toBeVisible();
    var randomFirstName = faker.person.firstName();
    const reg = new RegistrationPage(page);
    
    const userData = {
      firstName: randomFirstName ,
      lastName: faker.person.lastName(),
      email: getNewEmail() ,
      password: faker.internet.password() ,
      phoneNumber: `015${generateRandomId(10000000, 99999999)}`,
      address: faker.location.city()
    };

    //console.log(userData);
  
    await reg.registerUser(userData);


    //await expect(reg.alertToast).toBeVisible({ timeout: 40000 });
    const toastLocator = page.locator('.Toastify__toast');
    toastLocator.waitFor();
    const msg =await toastLocator.textContent();
    expect(msg).toContain("successfully!");
    await page.waitForTimeout(4000); // Wait for receiving email
  
    const latestEmail = await fetchEmail();
    console.log(latestEmail);
    const expectedMsg =  "Dear "+ randomFirstName  + ", Welcome to our platform!";
    expect(latestEmail).toContain(expectedMsg);
    
    // Save the user data to a JSON file
   jsonData.push(userData);
   fs.writeFileSync('./Utils/userData.json', JSON.stringify(jsonData, null, 2)); 
    
  });
  
  test("User can register By Only Mandatory Field", async ({ page }) => { 
     
    await page.goto("/");
  var randomFirstName = faker.person.firstName();
    const reg = new RegistrationPage(page);
    
    const userData = {
      firstName: randomFirstName ,
      lastName: "",
      email: getNewEmail() ,
      password: faker.internet.password() ,
      phoneNumber: `015${generateRandomId(10000000, 99999999)}`,
      address: ""
    };

    await reg.registerUser(userData);


    //await expect(reg.alertToast).toBeVisible({ timeout: 40000 });
    const toastLocator = page.locator('.Toastify__toast');
    toastLocator.waitFor();
    const msg =await toastLocator.textContent();
    expect(msg).toContain("successfully!");
    await page.waitForTimeout(4000); // Wait for receiving email
  
    const latestEmail = await fetchEmail();
    console.log(latestEmail);
    const expectedMsg =  "Dear "+ randomFirstName  + ", Welcome to our platform!";
    expect(latestEmail).toContain(expectedMsg);
    
    // Save the user data to a JSON file
   jsonData.push(userData);
   fs.writeFileSync('./Utils/userData.json', JSON.stringify(jsonData, null, 2)); 


  });


  test("User can not register with already used email", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Welcome to daily finance" })
    ).toBeVisible();
  
    const reg = new RegistrationPage(page);
    const latestUser = jsonData[ jsonData.length - 1 ];

    const userData = {
      firstName: faker.person.firstName() ,
      lastName: faker.person.lastName(),
      email:  latestUser.email ,
      password: faker.internet.password() ,
      phoneNumber: `015${generateRandomId(10000000, 99999999)}` ,
      address: faker.location.city()
    };

    //console.log(userData);
  
    await reg.registerUser(userData);


    //await expect(reg.alertToast).toBeVisible({ timeout: 40000 });
    const toastLocator = page.locator('.Toastify__toast');
    toastLocator.waitFor();
    const msg =await toastLocator.textContent();

    expect(msg).toContain("User with this email address already exists");
   
  

    
  });




  test("User can not register with Invalid Phone Number", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Welcome to daily finance" })
    ).toBeVisible();
  
    const reg = new RegistrationPage(page);
   

    const userData = {
      firstName: faker.person.firstName() ,
      lastName: faker.person.lastName(),
      email:  `Shouvik9292+${generateRandomId(5000, 9000)}@gmail.com` ,
      password: faker.internet.password() ,
      phoneNumber: `abcxyz${generateRandomId(100000, 999999)}`,
      address: faker.location.city()
    };

    //console.log(userData);
  
    await reg.registerUser(userData);


    //await expect(reg.alertToast).toBeVisible({ timeout: 40000 });
    const toastLocator = page.locator('.Toastify__toast');
    toastLocator.waitFor();
    const msg =await toastLocator.textContent();

    expect(msg).toContain("Phone Number is not valid");
   
  

    
  });

   
  
});