import TagsTable from "@components/Admin/TagsTable";

describe("TagsTable", () => {
  it("mount without error", () => {
    cy.mount(<TagsTable />);
  });

  it("render tags table", () => {
    cy.mount(<TagsTable />);
    cy.contains("Tags");
  });

  it("show total recipes", () => {
    cy.mount(<TagsTable />);
    cy.contains("Total Recipes");
  });

  it("show total clicks", () => {
    cy.mount(<TagsTable />);
    cy.contains("Total Clicks");
  });

  it("can edit tag name", () => {
    cy.mount(<TagsTable />);
    cy.get(
      '#cell-4-1 > [data-tag="allowRowEvents"] > div > .bg-blue-500'
    ).click();
    cy.get("#cell-1-1 > div > .w-full").should("not.be.disabled");
  });

  it("cannot change tag with same name", () => {
    cy.mount(<TagsTable />);
    cy.get(
      '#cell-4-1 > [data-tag="allowRowEvents"] > div > .bg-blue-500'
    ).click();
    cy.get(
      '#cell-4-1 > [data-tag="allowRowEvents"] > div > .bg-blue-500'
    ).click();
    cy.get(".block").should("contain.text", "Failed to edit tag");
  });

  it("can successfully change tag to other name", () => {
    cy.mount(<TagsTable />);
    cy.get(
      '#cell-4-1 > [data-tag="allowRowEvents"] > div > .bg-blue-500'
    ).click();
    cy.get("#cell-1-1 > div > .w-full").clear().type("New Tag");
    cy.get(
      '#cell-4-1 > [data-tag="allowRowEvents"] > div > .bg-blue-500'
    ).click();

    cy.get(
      '#cell-4-1 > [data-tag="allowRowEvents"] > div > .bg-blue-500'
    ).click();
    cy.get("#cell-1-1 > div > .w-full").clear().type("breakfast");
    cy.get(
      '#cell-4-1 > [data-tag="allowRowEvents"] > div > .bg-blue-500'
    ).click();
  });
});
