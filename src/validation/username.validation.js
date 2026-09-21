const { z } = require("zod");

const usernameSchema = z.object({
  username: z.string().min(3),
});

module.exports = usernameSchema;
