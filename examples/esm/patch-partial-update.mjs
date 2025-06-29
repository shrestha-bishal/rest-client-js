/**
 * Example: PATCH request to partially update a resource (ESM)
 */
import RestClient from '@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com');

async function run() {
  try {
    const patchData = {
      email: "new.email@example.com",
    };

    const response = await client.patchAsync('users/1', patchData);
    console.log('Patched user:', response);
  } catch (error) {
    console.error('PATCH request failed:', error);
  }
}

run();