import { DynamoDB } from '@aws-sdk/client-dynamodb';

export const db = new DynamoDB({
  region: 'us-west-1',
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_KEY'
  }
});
