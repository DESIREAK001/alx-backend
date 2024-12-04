import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient()
  .on('error', (err) => console.log(`Redis client not connected to server: ${err.message}`))
  .on('connect', () => console.log('Redis client connected to the server'));

const asyncGet = promisify(client.get).bind(client);

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}
async function displaySchoolValue(schoolName) {
  const value = await asyncGet(schoolName);
  if (value) console.log(value);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
