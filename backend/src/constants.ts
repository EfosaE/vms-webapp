import assert from 'assert';
import 'dotenv/config';

const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'NODE_ENV'
];

requiredEnvVars.forEach((key) => {
  assert(process.env[key], `❌ Missing environment variable: ${key}`);
});


// Export the environment variables as an object
export const env = Object.freeze(
    Object.fromEntries(
      requiredEnvVars.map((key) => [key, process.env[key]])
    )
  );
