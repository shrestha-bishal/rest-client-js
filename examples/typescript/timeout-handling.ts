/**
 * Example: Handling request timeouts (TypeScript)
 */
import LunexClient from 'lunex-http';

const client = new LunexClient('https://api.example.com', {}, {
  timeout: 3000, // 3 seconds
});

async function run(): Promise<void> {
  try {
    const data: any = await client.getAsync('slow-endpoint');
    console.log('Data:', data);
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('timed out')) {
      console.error('Request timed out:', error);
    } else {
      console.error('Request failed:', error);
    }
  }
}

run();
