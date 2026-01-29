import { test, expect } from '@playwright/test';
import { TicketsPage } from '../src/pages/TicketsPage';

test.describe('Tickets', () => {
  test('Create Ticket', async ({ page }) => {
    const tickets = new TicketsPage(page);
    await tickets.gotoWorkCenter();

    const created = await tickets.createTicket({
      subject: `PW Ticket ${Date.now()}`,
      priority: undefined // TODO: set a valid priority name for your tenant
    });

    expect(created.id).not.toEqual('');
  });

  test('Change Ticket', async ({ page }) => {
    const tickets = new TicketsPage(page);
    await tickets.gotoWorkCenter();

    const created = await tickets.createTicket({
      subject: `PW Ticket ${Date.now()}`
    });

    await tickets.changeTicket(created.id, {
      subject: `PW Ticket Updated ${Date.now()}`
    });
  });
});

