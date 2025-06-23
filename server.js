import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options(/^\/.*$/, cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
});


app.post("/send-email", async (req, res) => {
    try {
        const { to, subject, html, fromName = "Audit Wolf", attachments = [] } = req.body;

        if (!to || !subject || !html) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const mailOptions = {
            from: `"${fromName}" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
            attachments,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent" });

    } catch (err) {
        console.error("❌ Email send error:", err.message);
        res.status(500).json({ error: "Failed to send email", details: err.message });
    }
});

app.get("/", (_, res) => {
    res.send("Email API is running");
});

app.listen(port, () => {
    console.log(`Email API running at ${port}`);
});
