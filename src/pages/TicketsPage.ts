import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { c4cRoutes } from '../config/c4cRoutes';
import { c4cSelectors } from '../selectors/c4cSelectors';
import { appRoot } from '../utils/frame';

export type TicketInput = {
  subject: string;
  priority?: string;
};

export class TicketsPage {
  constructor(private readonly page: Page) {}

  async gotoWorkCenter() {
    await this.page.goto(c4cRoutes.ticketsWorkCenter);
  }

  async createTicket(input: TicketInput): Promise<{ id: string }> {
    const root = appRoot(this.page);
    await root.locator(c4cSelectors.tickets.createButton).click();

    await root.locator(c4cSelectors.tickets.fields.subject).fill(input.subject);
    if (input.priority) {
      await root.locator(c4cSelectors.tickets.fields.priority).click();
      await root.getByRole('option', { name: input.priority }).click();
    }

    await root.locator(c4cSelectors.tickets.saveButton).click();

    // TODO: replace with a stable locator for the created ticket's ID
    const id = (await root.locator(c4cSelectors.tickets.objectId).textContent())?.trim() ?? '';
    expect(id, 'Ticket ID should be captured after save').not.toEqual('');
    return { id };
  }

  async openTicketById(id: string) {
    const root = appRoot(this.page);
    await root.locator(c4cSelectors.tickets.search.searchInput).fill(id);
    await root.locator(c4cSelectors.tickets.search.goButton).click();
    await root.getByText(id, { exact: false }).first().click();
  }

  async changeTicket(id: string, patch: Partial<TicketInput>) {
    const root = appRoot(this.page);
    await this.openTicketById(id);

    await root.locator(c4cSelectors.tickets.editButton).click();

    if (patch.subject) {
      await root.locator(c4cSelectors.tickets.fields.subject).fill(patch.subject);
    }
    if (patch.priority) {
      await root.locator(c4cSelectors.tickets.fields.priority).click();
      await root.getByRole('option', { name: patch.priority }).click();
    }

    await root.locator(c4cSelectors.tickets.saveButton).click();
  }
}

