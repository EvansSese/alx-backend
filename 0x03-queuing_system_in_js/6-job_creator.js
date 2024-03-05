import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Object containing the Job data
const jobData = {
  phoneNumber: '+2541234567',
  message: 'Hello, this is a notification message!',
};

// Create a job in the push_notification_code queue
const job = queue.create('push_notification_code', jobData);

// Event handler for successful job creation
job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
});

// Event handler for completed job
job.on('complete', () => {
  console.log('Notification job completed');
});

// Event handler for failed job
job.on('failed', () => {
  console.log('Notification job failed');
});

// Save the job to the queue
job.save((err) => {
  if (err) {
    console.error(`Error creating job: ${err}`);
  }
});
