import UserManagement from "@components/Admin/UserManagement";

describe("UserManagement", () => {
  it("mount correctly", () => {
    cy.mount(<UserManagement />);
  });
  it("render user table", () => {
    cy.mount(<UserManagement />);
    cy.contains("Username");
  });
  it.only("load 10 row as default", () => {
    cy.mount(<UserManagement />);
    cy.get(".sc-cxabCf").should("contain.text", "10");
  });
});
