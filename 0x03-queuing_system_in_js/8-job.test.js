import kue from 'kue';
import { expect } from 'chai';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', function () {
  let queue;

  before(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  this.afterEach(() => {
    queue.testMode.clear();
  });

  after(() => {
    queue.testMode.exit();
  });

  it('raise error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('jobs', queue)).to.throw('Jobs is not an array');
  });

  it('create jobs', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
    ];
    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs).to.have.length(2);
    queue.testMode.jobs.forEach((job) => {
      expect(job.data).to.have.property('phoneNumber');
      expect(job.data).to.have.property('message');
      expect(job.type).to.equal('push_notification_code_3');
    });
  });

  it('create jobs with stub', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
    ];
    const stub = sinon.stub();
    stub.returns(1);
    queue.testMode.stub('create', stub);
    createPushNotificationsJobs(jobs, queue);
    expect(stub.callCount).to.equal(2);
  });

  it('calls log', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
    ];
    const logSpies = sinon.spy(console, 'log');
    createPushNotificationsJobs(jobs, queue);
    expect(logSpies.callCount).to.equal(2);
    logSpies.restore();
  });
});
