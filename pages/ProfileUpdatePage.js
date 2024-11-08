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
  }
  export default ProfileUpdatePage;