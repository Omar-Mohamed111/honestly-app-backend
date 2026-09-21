const { z } = require("zod");

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

module.exports = forgotPasswordSchema;