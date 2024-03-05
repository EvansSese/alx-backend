const kue = require('kue');
const queue = kue.createQueue();

// Array containing blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notification
function sendNotification(phoneNumber, message, job, done) {
  // Track progress of the job
  job.progress(0, 100);

  // If phoneNumber is blacklisted, fail the job
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Otherwise, track progress to 50%
  job.progress(50, 100);
  
  // Log to console
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Job done
  done();
}

// Queue process to process jobs
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
