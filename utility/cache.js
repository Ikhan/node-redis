import redisClient from '../config/redis.js';

async function getOrSetKey(key, cb) {
  try {
    const data = await redisClient.get(key);

    if (data != null) {
      console.log('Cache hit for key:', key);
      return JSON.parse(data);
    }

    console.log('Cache miss');
    const freshData = await cb();
    await redisClient.setEx(key, 3600, JSON.stringify(freshData));

    return freshData;
  } catch (cbError) {
    console.log('Error in callback (fetching fresh data):', cbError);
    throw cbError;
  }
}

export default { getOrSetKey };
