const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})

const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;

  return fib(index-1) + fib(index-2);
}

// any time we get a new value in redis, calulcate a fib value  and insert into a hash
sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});

// any time insert a new value into redis
sub.subscribe('insert');