import kue from 'kue';

const queue = kue.createQueue();

const data = {
  phoneNumber: '000000000',
  message: 'test',
};

const job = queue.create('push_notification_code', data).save((err) => {
  if (!err) console.log(`Notification job created: ${job.id}`);
});

job.on('complete', () => console.log('Notification job completed'));
job.on('failed', () => console.log('Notification job failed'));
