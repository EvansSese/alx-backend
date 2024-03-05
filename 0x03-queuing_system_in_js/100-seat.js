const express = require('express');
const redis = require('redis');
const kue = require('kue');
const { promisify } = require('util');

const app = express();
const port = 1245;

// Redis client
const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

// Reserve seats function
async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

// Get current available seats function
async function getCurrentAvailableSeats() {
  const availableSeats = await getAsync('available_seats');
  return parseInt(availableSeats);
}

// Initialize available seats to 50 and reservation status
reserveSeat(50);
let reservationEnabled = true;

// Kue queue
const queue = kue.createQueue();

// Route to get available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save(err => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', errorMessage => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

// Route to process queue and reserve seats
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const currentSeats = await getCurrentAvailableSeats();
    if (currentSeats === 0) {
      reservationEnabled = false;
      return done(new Error('Not enough seats available'));
    }

    await reserveSeat(currentSeats - 1);
    if (currentSeats === 1) {
      reservationEnabled = false;
    }
    done();
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
