import {fetchEmail} from '../Utils/utils.js'
import { expect } from '@playwright/test';

class ResetPassPage {
    constructor(page) {
        this.page = page;
        this.resetLink = page.getByRole('link', { name: 'Reset it here' });
        this.forgetPassHeading = page.getByRole('heading', { name: 'Forgot Password' });
        this.txtEmail = page.getByLabel('Email *');
        this.btnSendReset = page.getByRole('button', { name: 'Send Reset Link' });
        this.emailSentConfrim = page.getByText('Password reset link sent to');
        
        this.txtNewPass =  page.getByLabel('New Password *');
        this.txtConfirmPass = page.getByLabel('Confirm Password *');
        this.btnResetPass = page.getByRole('button', { name: 'Reset Password' });
        

    }

    async resetPasswordInvalidEmail(email){

        await this.page.goto("/");
        await this.resetLink.click();

    
        await this.txtEmail.fill(email);
        await this.btnSendReset.click();

    }
    
    async resetPassword(email, newPassword , confirmNewPass) {
        await this.page.goto("/");
        await this.resetLink.click();

    
        await this.txtEmail.fill(email);
        await this.btnSendReset.click();
        await expect(this.emailSentConfrim).toBeVisible({ timeout: 60000 });

        
        await this.page.waitForTimeout(4000); // for email delivery
        const latestEmail = await fetchEmail();
        const resetLink = latestEmail.split(": ")[1];

        await this.page.goto(resetLink);

        await this.txtNewPass.fill(newPassword);
        await this.txtConfirmPass.fill(confirmNewPass);
        await this.btnResetPass.click();
    }


    async resetPasswordOldLink(email, newPassword , confirmNewPass) {
        await this.page.goto("/");
        const latestEmail = await fetchEmail();
        const resetLink = latestEmail.split(": ")[1];

        await this.page.goto(resetLink);

        await this.txtNewPass.fill(newPassword);
        await this.txtConfirmPass.fill(confirmNewPass);
        await this.btnResetPass.click();
    }

}
export default ResetPassPage;