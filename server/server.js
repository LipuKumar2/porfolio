const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors('https://lipuportfolio.netlify.app/'));
app.use(express.json());

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: "All fields are required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password if using Gmail
      },
    });

  await transporter.sendMail({
  from: process.env.EMAIL_USER,     // Required by Gmail
  to: process.env.EMAIL_USER,       // Your inbox
  replyTo: email,                   // Lets you reply directly to the user
  subject: `New contact from ${name}`,
  text: `You have a new message from your portfolio site:

Name: ${name}
Email: ${email}
Message:
${message}`,
});


    res.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

app.get("/", (req, res) => {
  res.send("Portfolio backend is running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
