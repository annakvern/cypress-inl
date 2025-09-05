const uniqeEmail = () => Math.random().toString(36).slice(2, 8);

describe("Booking flow", () => {
  before(() => {
    cy.task("reseed");
  });

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("books an activity and reaches confirmation", () => {
    cy.visit("/");
    cy.contains("Boka aktivitet");

    cy.contains('[data-cy="activity-card"]', "Skogsnattvandring").within(() => {
      cy.get('[data-cy="open-booking"]').click();
    });

    cy.get('[data-cy="booking-form"]').within(() => {
      cy.get('input[type="date"]').type("2026-08-17");
      cy.get('input[name="name"]').type("K").blur();
      cy.get('[data-cy="name-error"]').should(
        "contain",
        "Skriv minst 2 tecken"
      );
      cy.get('input[name="name"]').type("Kalle Test");
      cy.get('input[name="email"]').type("t").blur();
      cy.get('[data-cy="email-error"]').should(
        "contain",
        "Ange en giltig e-postadress."
      );
      cy.get('input[name="email"]').type(`kalle.${uniqeEmail()}@example.com`);
      cy.contains("Fullför bokning").click();
    });

    cy.url().should("include", "/confirmation/");
    cy.get('[data-cy="confirmation-title"]').should(
      "contain",
      "Yay! Du är bokad"
    );
    cy.contains("Skogsnattvandring");
    cy.contains(/17 augusti 2026|2026-08-17/);
  });
});
