class AddcostPage {
    constructor(page) {
      this.page = page;
      this.btnAddCost = page.getByRole("button", { name: "Add Cost" });
      this.txtItemName = page.getByLabel("Item Name");
      this.btnIncrement = page.getByRole("button", { name: "+" });
      this.txtAmount = page.getByLabel("Amount");
      this.txtPurchaseDate = page.getByLabel("Purchase Date");
      this.selectMonth = page.getByLabel("Month");
      this.btnSubmit = page.getByRole("button", { name: "Submit" });
     
    }
  }
  export default AddcostPage;