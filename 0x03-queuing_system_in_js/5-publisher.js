import redis from 'redis';

// Create a Redis client
const publisher = redis.createClient();

// Event handler for successful connection
publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection errors
publisher.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to publish message after a certain time
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    publisher.publish('holberton school channel', message);
  }, time);
}

// Call publishMessage for different messages and times
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
