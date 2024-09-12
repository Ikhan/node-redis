import redis from 'redis';

const redisClient = redis.createClient();
(async () => {
  await redisClient.connect();
})();

export default redisClient;
