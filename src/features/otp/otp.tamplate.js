const otpTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Honestly App</h1>

        <p>Your verification code is:</p>

        <h2>${otp}</h2>

        <p>This code expires in 5 minutes.</p>
      </body>
    </html>
  `;
};

module.exports = otpTemplate;
