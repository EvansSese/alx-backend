import redis from 'redis';

// Create a Redis client
const subscriber = redis.createClient();

// Event handler for successful connection
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection errors
subscriber.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel
subscriber.subscribe('holberton school channel');

// Event handler for incoming messages
subscriber.on('message', (channel, message) => {
  console.log(`Message received on channel ${channel}: ${message}`);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
