const { z } = require("zod");

const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/),
  newPassword: z.string().min(6),
});

module.exports = resetPasswordSchema;
