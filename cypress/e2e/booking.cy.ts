// cypress/e2e/booking.cy.ts
const uniqeEmail = () => Math.random().toString(36).slice(2, 8);

describe("Booking flow", () => {
  before(() => {
    cy.exec("node scripts/seed-for-tests.js");
  });

  it("books an activity and reaches confirmation", () => {
    cy.visit("/");
    cy.contains("Boka aktivitet");

    // Click the activity card to open page
    cy.contains("Skogsnattvandring").click();

    // Open booking modal/button
    cy.get('[data-cy="open-booking"]').click();

    // Fill form
    cy.get('[data-cy="booking-form"]').within(() => {
      // type="date" needs YYYY-MM-DD
      cy.get('input[type="date"]').type("2026-08-17");
      cy.get('input[name="name"]').type("Lisa Test");
      cy.get('input[name="email"]').type(`lisa.${uniqeEmail()}@example.com`);
      cy.contains("Fullför bokning").click();
    });

    // Redirected + confirmation renders
    cy.url().should("include", "/confirmation/");
    cy.get('[data-cy="confirmation-title"]').should(
      "contain",
      "Yay! Du är bokad"
    );
    cy.contains("Skogsnattvandring");
    cy.contains(/17 augusti 2026|2026-08-17/);
  });
});
