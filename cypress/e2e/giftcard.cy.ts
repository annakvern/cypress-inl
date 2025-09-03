// cypress/e2e/giftcard.cy.ts
const uniq = () => Math.random().toString(36).slice(2, 8);

describe("Gift card flow", () => {
  before(() => {
    cy.exec("node scripts/seed-for-tests.js");
  });

  it("buys a gift card from the booking modal link", () => {
    cy.visit("/");
    cy.contains("Skogsnattvandring").click();

    cy.get('[data-cy="open-booking"]').click();
    cy.get('[data-cy="giftcard-link"]').click();

    // We support both /giftcard/new and /giftcard/new/:id/:title
    cy.url().should("include", "/giftcard/new");

    // Form fill
    cy.get('input[name="fromName"]').type("Lisa");
    cy.get('input[name="toName"]').type("Pojkvännen");
    cy.get('input[name="email"]').type(`buyer.${uniq()}@example.com`);
    cy.get('textarea[name="message"]').type("Grattis på födelsedagen! 🎉");

    // If generic page shows a dropdown, select something (optional)
    cy.get("select#activity").then(($sel) => {
      if ($sel.length) cy.wrap($sel).select("Skogsnattvandring");
    });

    cy.contains("Köp").click();

    // Confirmation
    cy.url().should("include", "/giftcard/");
    cy.contains("Tack! Ditt presentkort är klart");
    cy.contains(/Skogsnattvandring|Valfri aktivitet/);
    // Optional: code box if you display one
  });
});
