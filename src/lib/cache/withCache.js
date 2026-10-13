const cacheProvider = require("./init");

// Create a cache middleware
// ttl = Time To Live (in seconds)
// Default value: 3600 seconds = 1 hour
const withCache = (ttl = 3600) => {
  return async (req, res, next) => {
    // Create a unique key for each request using its method and URL
    // Example: GET:/users/get-all-users
    const key = `${req.method}:${req.originalUrl}`;

    try {
      // Check if the requested data already exists in Redis
      const cached = await cacheProvider.get(key);
      // If cached data exists, return it without querying the database
      if (cached) {
        // Tell the client that the response came from the cache
        res.setHeader("X-Cache", "HIT");

        // Convert the cached JSON string back into a JavaScript value
        // Then send it as the response
        return res.json(JSON.parse(cached));
      }

      // If the data (is not cached), save the original res.json method
      // so we can run our caching logic before sending the response
      const originalJson = res.json.bind(res);

      // Override res.json to intercept the response body
      res.json = (body) => {
        // Cache only successful responses (status codes 200–299)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // Convert the response body into a JSON string
          // and store it in Redis with the specified TTL
          cacheProvider.set(key, JSON.stringify(body), ttl).catch((err) => {
            // Log caching errors without preventing the response
            console.error("Cache set failed:", err.message);
          });
        }

        // Tell the client that the response was not found in the cache
        res.setHeader("X-Cache", "MISS");

        // Send the response using the original Express res.json method
        return originalJson(body);
      };

      // Continue to the next middleware or route handler
      // The route handler will fetch the data if needed
      next();
    } catch (err) {
      // Pass errors to the global error-handling middleware
      next(err);
    }
  };
};

module.exports = withCache;
