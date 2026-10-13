// schema to validate .env

const z = require("zod");
require("dotenv").config();

const schema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
  EMAIL_USER: z.string().trim().toLowerCase(),
  EMAIL_PASS: z.string(),
  REDIS_PORT: z.string().default("6379"),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
});

const parsed = schema.parse(process.env);

const env = {
  port: Number(parsed.PORT),
  db: { url: parsed.MONGO_URI },
  redis: {
    host: parsed.REDIS_HOST,
    port: Number(parsed.REDIS_PORT),
    password: parsed.REDIS_PASSWORD,
  },
  nodemailer: { user: parsed.EMAIL_USER, pass: parsed.EMAIL_PASS },
  jwt: { secret: parsed.JWT_SECRET },
  payments: {},
  aws: {},
};

module.exports = env;
