import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
    try {
        const { auth, mail } = req.body;

        // Validate presence of required fields
        if (!auth?.user || !auth?.pass || !mail?.to || !mail?.subject || !mail?.html) {
            return res.status(400).json({
                error: "Missing required fields: auth.user, auth.pass, mail.to, mail.subject, mail.html"
            });
        }

        // Gmail SMTP setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: auth.user,
                pass: auth.pass
            }
        });

        const mailOptions = {
            from: `"${mail.fromName || "Audit Wolf"}" <${mail.fromEmail || auth.user}>`,
            to: mail.to,
            subject: mail.subject,
            html: mail.html,
            attachments: mail.attachments || [],
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Email sent successfully" });

    } catch (err) {
        console.error("❌ Email send error:", err.message);
        res.status(500).json({ error: "Failed to send email", details: err.message });
    }
};
