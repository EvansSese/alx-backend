import redis from 'redis';

// Connect to Redis server
const client = redis.createClient();

// Event handler for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection errors
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to create and store a hash in Redis
function createHash() {
  client.hset('HolbertonSchools', 'Portland', 50, redis.print);
  client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
  client.hset('HolbertonSchools', 'New York', 20, redis.print);
  client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
  client.hset('HolbertonSchools', 'Cali', 40, redis.print);
  client.hset('HolbertonSchools', 'Paris', 2, redis.print);
}

// Function to display the hash stored in Redis
function displayHash() {
  client.hgetall('HolbertonSchools', (err, hash) => {
    if (err) {
      console.error(`Error getting hash from Redis: ${err.message}`);
    } else {
      console.log('Hash stored in Redis:');
      console.log(hash);
    }
  });
}

// Create and store the hash
createHash();

// Display the stored hash
displayHash();
