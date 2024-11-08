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
}
export default ResetPassPage;