import { expect, test } from '@nuxt/test-utils/playwright'
import { fetch } from '@nuxt/test-utils/e2e'
import type { Page } from '@playwright/test';

// https://playwright.dev/docs/test-components
// https://playwright.dev/docs/api/class-locator

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test('Landing Page', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const heading = await page.textContent('h1')
    expect(page).toHaveTitle('C3 KMUTT Network')
    expect(heading).toBe('We are a collaborative platform for sharing knowledge in innovation')
})

test('Fetch highlight projects', async () => {
    const res = await fetch('/api/landing/projects')
    const data = await res.json()
    expect(data).toHaveLength(6)
    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('title')
    expect(data[0]).toHaveProperty('imageUrl')
    expect(data[0]).toHaveProperty('location')
    expect(data[0]).toHaveProperty('category')
    expect(typeof data[0].id).toBe('number')
    expect(typeof data[0].title).toBe('string')
    expect(typeof data[0].imageUrl).toBe('string')
    expect(typeof data[0].location).toBe('string')
    expect(typeof data[0].category).toBe('string')
})