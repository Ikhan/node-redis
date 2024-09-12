import redis from 'redis';

// const redisUrl = 'redis://127.0.0.1:6379';

const redisClient = redis.createClient();
(async () => {
  await redisClient.connect();
})();

export default redisClient;
