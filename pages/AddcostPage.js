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
    
      async addCost( costObject  ) {
        await this.btnAddCost.click();
        await this.txtItemName.fill(costObject.itemName);

      
        for (let i = 0; i < costObject.incrementClicks; i++) {
            await this.btnIncrement.click();
        }

        await this.txtAmount.fill(costObject.amount);
        await this.txtPurchaseDate.fill(costObject.purchaseDate);
        await this.selectMonth.selectOption(month);
        await this.btnSubmit.click();

       
       await expect(this.btnAddCost).toBeVisible({ timeout: 40000 });
    }

  }
  export default AddcostPage;