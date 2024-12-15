const nodemailer = require("nodemailer");

const sendemail = async (emailOption) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user:"hossameldawody@gmail.com",
            pass:" iuyj jvdn mpni cxbs",
        },
    });

    const mailOptions = {
        from: emailOption.from,
        to: emailOption.to,
        subject: emailOption.subject,
        html: emailOption.text,
    };

    await transporter.sendMail(mailOptions);
};
module.exports = sendemail ;
