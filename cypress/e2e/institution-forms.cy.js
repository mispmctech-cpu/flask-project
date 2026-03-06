/// <reference types="cypress" />

// Cypress E2E: institution forms upload + Completed validation
// - Stubs `window.supabase.createClient` to avoid real network uploads
// - Uses a small fixture `sample.pdf` to emulate file selection
// - Visits /institution-form{N}.html for N=1..17 and runs checks

describe('Institution forms — upload UI and Completed validation', () => {
  const pages = Array.from({ length: 17 }, (_, i) => `/institution-form${i + 1}.html`);

  pages.forEach((path) => {
    it(`checks ${path}`, () => {
      // Provide a mocked supabase client before the page's scripts run
      cy.visit(path, {
        onBeforeLoad(win) {
          // Minimal mocked supabase client used by templates
          win.supabase = {
            createClient: (url, key) => {
              return {
                storage: {
                  from: (bucket) => ({
                    upload: (p, file, opts) => {
                      // Simulate successful upload
                      return Promise.resolve({ data: {}, error: null });
                    },
                    getPublicUrl: (p) => ({ data: { publicUrl: `https://example.test/${encodeURIComponent(p)}` } })
                  })
                }
              };
            }
          };
        }
      });

      // Replace window.alert with a stub so we can assert it was called
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alertStub');
      });

      // The forms are large; ensure at least one form is present
      cy.get('form').first().should('exist');

      // Try to find a status <select> that has an option containing "Completed"
      cy.get('select').then(($sels) => {
        const target = Array.from($sels).find((s) => Array.from(s.options).some((o) => /Completed/i.test(o.text)));
        if (target) {
          const opt = Array.from(target.options).find((o) => /Completed/i.test(o.text));
          // Select by visible text (option text is typically used as value)
          cy.wrap(target).select(opt.text);
        } else {
          cy.log('No "Completed" option found on page — skipping status select step');
        }
      });

      // If file inputs exist, attach fixture and assert filename + Replace visibility
      cy.get('input.file-input').then(($inputs) => {
        if ($inputs.length) {
          const first = $inputs[0];
          cy.wrap(first).selectFile('cypress/fixtures/sample.pdf', { force: true });

          // Filename should appear in the .file-name element
          cy.get('.file-name').first().should('contain.text', 'sample.pdf');

          // After mocked upload resolves, Replace button should be shown (not have class 'hidden')
          cy.get('.replace-btn').first().should('not.have.class', 'hidden');
        } else {
          cy.log('No file-input on this page — skipping upload assertions');
        }
      });

      // Submit the first form and assert that client-side validation triggers an alert
      cy.get('form').first().submit();

      // The templates show an alert when Completed is selected but neither description nor file is provided
      cy.get('@alertStub').should('have.been.called');
    });
  });
});
