const nodemailer = require("nodemailer");

module.exports = async (email, subject, body) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        // port: Number(process.env.PORT),
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        html: body,
    });
};
