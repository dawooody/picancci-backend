const router = require("express").Router();
const emailMessage = require("../utils/emailMessage");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const CryptoJs = require("crypto");
const CryptoJs12 = require("crypto-js");



router.post('/me',  async (req, res) => {
    const email= req.body.email;
    const user = await User.findOne({ email});
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedResetCode = CryptoJs.createHash('sha256').update(resetCode).digest('hex');
        user.resetPasswordCode = hashedResetCode;
        user.resetPasswordExpire = new Date(Date.now() + 20 * 60 * 1000);
        user.resetPasswordVerified = false;

        await user.save();
        const message =emailMessage(resetCode);
    //send email
    const sendEmailResponse = await sendEmail({
        from: 'picancci',
        to: email,
        subject: 'Code reset request',
        text: message,})
        res.status(200).json({message: "email sent"})
    });
 
    router.post('/verity-reset-password', async (req, res, next) => {
        const hashedResetCode = CryptoJs
          .createHash('sha256')
          .update(req.body.resetCode)
          .digest('hex');
      
        const user = await User.findOne({
            resetPasswordCode: hashedResetCode,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) {
          throw new Error('The code is invalid or expired');
        }
 
        user.resetPasswordVerified = true;
        await user.save();
      
        res.status(200).json({
          status: 'Success',
        });
      });
      
      router.post('/change-password', async (req, res, next) => {
        // 1) Get user based on email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('User with this email not found')
        }
      
        // 2) Check if reset code verified 
        if (!user.resetPasswordVerified) {
          return next(new ApiError('Reset code not verified', 400));
        }
       
        user.password =  CryptoJs12.AES.encrypt(
            req.body.newPassword,
            process.env.pass_sec,
            
        ).toString();
        user.resetPasswordCode = undefined;
        user.resetPasswordExpire = undefined;
        user.resetPasswordVerified = undefined;
      
        await user.save();
      
        res.status(200).json({ status: 'success', message: 'Password changed' });
    });
        module.exports = router; 
