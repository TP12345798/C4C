# SAP C4C Playwright Tests (Leads + Tickets)

This repo contains Playwright end-to-end tests for SAP Cloud for Customer (C4C):

- Create Lead
- Change Lead
- Create Ticket
- Change Ticket

## Setup

1. Install Node.js 18+.
2. Install dependencies:

```bash
npm i
```

3. Install browsers:

```bash
npm run install:browsers
```

4. Create `.env` from `.env.example` and fill values.

## Run

```bash
npm test
```

## Important: selectors and URLs

C4C tenants differ by UI configuration. Update:

- `src/selectors/c4cSelectors.ts`
- `src/config/c4cRoutes.ts`

so the tests can find the Lead/Ticket create + edit screens in your tenant.

"# C4C" 
