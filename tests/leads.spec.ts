import { test, expect } from '@playwright/test';
import { LeadsPage } from '../src/pages/LeadsPage';

test.describe('Leads', () => {
  test('Create Lead', async ({ page }) => {
    const leads = new LeadsPage(page);
    await leads.gotoWorkCenter();

    const created = await leads.createLead({
      name: `PW Lead ${Date.now()}`,
      status: undefined // TODO: set a valid status name for your tenant
    });

    expect(created.id).not.toEqual('');
  });

  test('Change Lead', async ({ page }) => {
    const leads = new LeadsPage(page);
    await leads.gotoWorkCenter();

    const created = await leads.createLead({
      name: `PW Lead ${Date.now()}`
    });

    await leads.changeLead(created.id, {
      name: `PW Lead Updated ${Date.now()}`
    });
  });
});

