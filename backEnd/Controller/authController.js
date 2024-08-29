const crypto = require('crypto');
const nodemailer = require('nodemailer');
const userData = require('../Moduls/User');
const bcryptjs = require('bcryptjs');

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userData.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        // Set up email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        console.log(email);

        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset Request',
            text: `
                You are receiving this email because you (or someone else) has requested to reset the password for your account.

                Please click on the following link, or paste it into your browser, to complete the process:

                http://localhost:3000/reset-password/${resetToken}

                If you did not request this, please ignore this email and your password will remain unchanged.
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
        console.error('Error during password reset request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await userData.findOne({ resetToken: token });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        if (user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ error: 'Token has expired' });
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { forgotPassword, resetPassword };
