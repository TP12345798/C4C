import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { c4cRoutes } from '../config/c4cRoutes';
import { c4cSelectors } from '../selectors/c4cSelectors';
import { appRoot } from '../utils/frame';

export type LeadInput = {
  name: string;
  status?: string;
};

export class LeadsPage {
  constructor(private readonly page: Page) {}

  async gotoWorkCenter() {
    await this.page.goto(c4cRoutes.leadsWorkCenter);
  }

  async createLead(input: LeadInput): Promise<{ id: string }> {
    const root = appRoot(this.page);
    await root.locator(c4cSelectors.leads.createButton).click();

    await root.locator(c4cSelectors.leads.fields.name).fill(input.name);
    if (input.status) {
      await root.locator(c4cSelectors.leads.fields.status).click();
      await root.getByRole('option', { name: input.status }).click();
    }

    await root.locator(c4cSelectors.leads.saveButton).click();

    // TODO: replace with a stable locator for the created lead's ID
    const id = (await root.locator(c4cSelectors.leads.objectId).textContent())?.trim() ?? '';
    expect(id, 'Lead ID should be captured after save').not.toEqual('');
    return { id };
  }

  async openLeadById(id: string) {
    const root = appRoot(this.page);
    await root.locator(c4cSelectors.leads.search.searchInput).fill(id);
    await root.locator(c4cSelectors.leads.search.goButton).click();
    await root.getByText(id, { exact: false }).first().click();
  }

  async changeLead(id: string, patch: Partial<LeadInput>) {
    const root = appRoot(this.page);
    await this.openLeadById(id);

    await root.locator(c4cSelectors.leads.editButton).click();

    if (patch.name) {
      await root.locator(c4cSelectors.leads.fields.name).fill(patch.name);
    }
    if (patch.status) {
      await root.locator(c4cSelectors.leads.fields.status).click();
      await root.getByRole('option', { name: patch.status }).click();
    }

    await root.locator(c4cSelectors.leads.saveButton).click();
  }
}

