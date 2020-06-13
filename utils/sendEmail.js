const nodemailer = require('nodemailer');
const vars = require('../config/vars');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: vars.SMTP_SERVER,
    port: vars.SMTP_PORT,
    auth: {
      user: vars.SMTP_EMAIL,
      pass: vars.SMTP_PASSWORD
    }
  });

  const message = {
    from: `${vars.FROM_NAME} <${vars.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;