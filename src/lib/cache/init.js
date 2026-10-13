const RedisCacheProvider = require("../../pkg/cache/cache");

// Import the environment configuration
// This contains the Redis host, port, and password
const env = require("../config/env");

// Create a Redis cache provider instance
// and pass the Redis connection settings to it
const cacheProvider = new RedisCacheProvider({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password || "",
});

// Export the initialized cache provider
// so other files can use it to get, set, or delete cached data
module.exports = cacheProvider;
