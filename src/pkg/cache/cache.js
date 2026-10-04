const redis = require("../../lib/cache/redis");

const getCache = async (key) => {
    
  const data = await redis.get(key);
  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

const setCache = async (key, value, ttl) => {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
};

const deleteCache = async (key) => {
  await redis.del(key);
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
};
