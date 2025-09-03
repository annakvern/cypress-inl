describe("home page", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("should have a layout with a header, main and footer element", () => {
    cy.visit("/");
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });

  it("should display four activities", () => {
    cy.visit("/");
    cy.get("li").should("have.length", 3);
    cy.get("li").first().should("contain.text", "Feed the cat");
    cy.get("li").last().contains("Walk all the cats");
  });

  it("should be able to delete a todo", () => {
    cy.visit("/");
    cy.contains("Feed the cat").parents("li").find("button").click();
    cy.get("li").should("have.length", 2);
    cy.contains("Feed the cat").should("not.exist");
  });
});
