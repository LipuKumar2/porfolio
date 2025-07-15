const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

const mailOptions = {
  from: process.env.EMAIL_USER, // Your Gmail (matches SMTP login)
  to: process.env.EMAIL_USER,   // You receive the email
  subject: `Message from ${name}`,
  text: `
    You have received a new message from your portfolio contact form.

    Name: ${name}
    Email: ${email}

    Message:
    ${message}
  `,
  replyTo: email  // This lets you reply directly to the user
};

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/', (_req, res) => {
  res.send('API is working');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const path = require('path');

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
