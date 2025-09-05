const uniqeEmail2 = () => Math.random().toString(36).slice(2, 8);

describe("Gift card flow", () => {
  before(() => {
    cy.task("reseed");
  });

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("buys a gift card from the booking modal link", () => {
    cy.visit("/");
    cy.contains('[data-cy="activity-card"]', "Nattrejv i skogen")
      .find('[data-cy="open-booking"]')
      .click();

    cy.get('[data-cy="booking-modal"]').should("be.visible");
    cy.get('[data-cy="booking-title"]').should("contain", "Nattrejv i skogen");

    cy.get('[data-cy="booking-form"]').within(() => {
      cy.get('[data-cy="giftcard-link"]').click();
    });

    cy.url().should("include", "/giftcard/new");

    cy.get('input[name="fromName"]').type("L").blur();
    cy.get('[data-cy="from-name-error"]').should(
      "contain",
      "Skriv minst 2 tecken"
    );
    cy.get('input[name="fromName"]').type("Lisa");

    cy.get('input[name="toName"]').type("K").blur();
    cy.get('[data-cy="to-name-error"]').should(
      "contain",
      "Skriv minst 2 tecken"
    );
    cy.get('input[name="toName"]').type("Kajsa");
    cy.get('input[name="email"]').type("l").blur();
    cy.get('[data-cy="email-error"]').should(
      "contain",
      "Ange en giltig e-postadress."
    );
    cy.get('input[name="email"]').type(`buyer.${uniqeEmail2()}@example.com`);
    cy.get('textarea[name="message"]').type("Grattis på födelsedagen!");

    cy.get("body").then(($body) => {
      const $sel = $body.find('[data-cy="activity-select"]');
      if ($sel.length) cy.wrap($sel).select("Skogsnattvandring");
    });

    cy.get('[data-cy="giftcard-form"]').submit();

    cy.url().should("include", "/giftcard/");
    cy.contains("Tack! Ditt presentkort är klart");
    cy.contains(/Nattrejv i skogen|Valfri aktivitet/);
    cy.get('[data-cy="giftcard-code"]')
      .invoke("text")
      .then((t) => {
        const code = t.trim();
        expect(code).to.match(/^[a-z0-9]{25}$/);
      });
  });
});
