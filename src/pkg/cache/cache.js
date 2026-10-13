const { Redis } = require("ioredis");

// Create a class responsible for communicating with Redis
class RedisCacheProvider {
  // Store the Redis client instance
  client;

  // Initialize the Redis connection using the provided configuration
  constructor(config) {
    this.client = new Redis({
      host: config.host,
      port: config.port,
      password: config.password,

      // Delay connecting until we explicitly call connect()
      lazyConnect: true,

      // Limit the time spent waiting while Redis is loading data
      maxLoadingRetryTime: 3,
    });

    // Listen for Redis connection errors
    this.client.on("error", (err) =>
      console.log("redis server error", err.message),
    );

    // Establish the Redis connection
    // Log the error if the connection fails
    this.client
      .connect()
      .catch((err) => console.log("fail to connect to redis", err.message));
  }

  // Store a value in Redis with an expiration time
  // ttl is measured in seconds
  async set(key, value, ttl) {
    return await this.client.set(key, value, "EX", ttl, "NX");
  }

  // Retrieve a value from Redis using its key
  // Returns null if the key does not exist
  async get(key) {
    return await this.client.get(key);
  }

  // Delete a value from Redis using its key
  async del(key) {
    return await this.client.del(key);
  }
}

module.exports = RedisCacheProvider;
