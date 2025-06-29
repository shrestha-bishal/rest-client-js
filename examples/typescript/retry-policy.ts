/**
 * Example: Using retry logic with RestClient (TypeScript)
 */
import RestClient from '@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com', {}, {
  maxRetries: 3,
  shouldRetry: (response: Response): boolean => [502, 503, 504].includes(response.status),
});

async function run(): Promise<void> {
  try {
    const data: any = await client.getAsync('unstable-endpoint');
    console.log('Data:', data);
  } catch (error: unknown) {
    console.error('Request failed after retries:', error);
  }
}

run();
