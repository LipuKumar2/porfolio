const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '',
}));
app.use(express.json());

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,      // Your Gmail address
            pass: process.env.EMAIL_PASS       // App Password (not your Gmail password!)
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Message from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Failed to send email.' });
    }
});

app.listen(process.env.PORT || 4000, () => {
    console.log('Server running...');
});
