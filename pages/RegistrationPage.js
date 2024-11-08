import {  expect } from "@playwright/test";
class RegistrationPage {
    constructor(page) {
      this.page = page;
      this.registrationLink = page.getByRole("link", { name: "Register" });
      this.txtFirstName = page.getByLabel("First Name *");
      this.txtLastName = page.getByLabel("Last Name");
      this.txtEmail = page.getByLabel("Email *");
      this.txtPassword = page.getByLabel("Password *");
      this.txtPhoneNumber = page.getByLabel("Phone Number *");
      this.txtAddress = page.getByLabel("Address");
      this.gender = page.getByRole("radio");
      this.terms = page.getByRole("checkbox");
      this.btnRegister = page.getByRole("button", { name: "Register" });
      this.alertToast = page.getByRole("alert");
    }
  
    async registerUser(user) {
      await this.registrationLink.click();
      await this.txtFirstName.fill(user.firstName);
      await this.txtLastName.fill(user.lastName);
      await this.txtEmail.fill(user.email);
      await this.txtPassword.fill(user.password);
      await this.txtPhoneNumber.fill(user.phoneNumber);
      await this.txtAddress.fill(user.address);
      await this.gender.first().check();
      await this.terms.check();
      await this.btnRegister.click();



    }
  }
  export default RegistrationPage;