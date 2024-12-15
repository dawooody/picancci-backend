const emailmessage = (resetCode) => {

    const message = 
    `<h1>Password Reset Request</h1>
<p>We received a request to reset your password for your Picancci account.</p>
<p>If you requested this, click the button below to reset your password:</p>
<a >Reset Password: ${resetCode}</a>
<p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
<br />
<p>Best Regards,</p>
<p>The Picancci Team</p>`
return message ;
}
module.exports = emailmessage ; 