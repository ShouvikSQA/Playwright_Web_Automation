import {expect} from "@playwright/test"

class ProfileUpdatePage {
    constructor(page) {
      this.page = page;
      this.btnUserAccount = page.getByLabel("account of current user");
      this.btnProfile = page.getByRole("menuitem", { name: "Profile" });
      this.btnEdit = page.getByRole("button", { name: "Edit" });
      this.btnChooseFile = page.locator('input[type="file"]');
      this.btnUploadImage = page.getByRole("button", { name: "Upload Image" });
      this.btnUpdate = page.getByRole("button", { name: "Update" });
    }
  
   async uploadProfileAndUpdate(filePath) {


           
        await this.btnUserAccount.click();
        await this.btnProfile.click();
        await this.btnEdit.click();
        await this.btnChooseFile.setInputFiles(filePath);

        const alertMessages = [];
        this.page.on('dialog', async dialog => {
            alertMessages.push(dialog.message());
            await dialog.accept();
        });
        
        await this.btnUploadImage.click();
 
        await this.page.waitForEvent('dialog'); 
        await this.page.waitForTimeout(1000);

      
        await this.btnUpdate.click();
        await this.page.waitForEvent('dialog');

       
        expect(alertMessages[0]).toBe('Image uploaded successfully!');
        expect(alertMessages[1]).toBe('User updated successfully!');

    
    }
  }

  export default ProfileUpdatePage;