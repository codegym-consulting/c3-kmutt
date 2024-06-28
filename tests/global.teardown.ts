import { test as teardown } from '@playwright/test';

teardown('Delete database', async () => {
  console.debug('Deleting test database...');
  // Delete the database
});