const { expect } = require('chai');
const kue = require('kue');
const createPushNotificationsJobs = require('./8-job');

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    // Create a Kue queue in test mode
    queue = kue.createQueue({ redis: { createClientFactory: () => kue.redis.createClient() } });
    queue.testMode.enter();
  });

  after(() => {
    // Clear the queue and exit test mode after tests
    queue.testMode.exit();
  });

  afterEach(() => {
    // Clear the queue after each test
    queue.testMode.clear();
  });

  it('throws an error if jobs is not an array', () => {
    expect(() => {
      createPushNotificationsJobs({}, queue);
    }).to.throw('Jobs is not an array');
  });

  it('creates jobs in the queue', () => {
    const jobs = [
      { phoneNumber: '123', message: 'Message 1' },
      { phoneNumber: '456', message: 'Message 2' },
      { phoneNumber: '789', message: 'Message 3' },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Validate jobs in the queue
    expect(queue.testMode.jobs.length).to.equal(jobs.length);

    // Validate job data
    jobs.forEach((jobData, index) => {
      const job = queue.testMode.jobs[index];
      expect(job.type).to.equal('push_notification_code_3');
      expect(job.data).to.deep.equal(jobData);
    });
  });
});
