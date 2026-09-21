const { z } = require("zod");

const createMessageSchema = z.object({
  receiver: z.string().regex(/^[0-9a-fA-F]{24}$/),
  content: z.string().trim().min(1),
  isAnonymous: z.boolean(),
  replyTo: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
});

module.exports = createMessageSchema;
