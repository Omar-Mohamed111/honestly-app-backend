const nodemailer = require("nodemailer");
const env = require("../config/env");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.nodemailer.user,
    pass: env.nodemailer.pass,
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Honestly App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = {
  sendEmail,
};
