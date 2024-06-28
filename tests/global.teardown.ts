import { test as teardown } from '@playwright/test';

teardown('Delete database', async () => {
  console.log('Deleting test database...');
  // Delete the database
});