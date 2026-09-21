const { z } = require("zod");

const verifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

module.exports = verifyOTPSchema;
