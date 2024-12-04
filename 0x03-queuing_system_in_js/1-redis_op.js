import { createClient, print } from 'redis';

const client = createClient()
  .on('error', (err) => console.log(`Redis client not connected to server: ${err.message}`))
  .on('connect', () => console.log('Redis client connected to the server'));

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}
function displaySchoolValue(schoolName) {
  client.get(schoolName, (_, value) => {
    if (value) console.log(value);
  });
}
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
