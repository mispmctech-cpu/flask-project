Running the Cypress E2E test for institution forms

Prerequisites
- Node.js and npm installed
- Your Flask app running locally (default: http://localhost:5000)

Install Cypress

1. Initialize npm (if you don't have package.json yet):
   npm init -y

2. Install Cypress as a dev dependency:
   npm install --save-dev cypress

Run the single spec

Open Cypress UI (recommended for first run):
  npx cypress open --config baseUrl=http://localhost:5000

Run headless (CI or quick run):
  npx cypress run --config baseUrl=http://localhost:5000 --spec "cypress/e2e/institution-forms.cy.js"

Notes
- The test stubs the Supabase storage client (so it won't upload to your real Supabase project).
- The tests visit URLs like `/institution-form1.html` — ensure your Flask app serves these templates (default app.py includes a catch-all route that renders templates by name).
- If your Flask server runs on a different host/port, update the `baseUrl` value passed to Cypress.
