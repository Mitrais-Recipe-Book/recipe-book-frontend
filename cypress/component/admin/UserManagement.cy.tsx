import UserManagement from "@components/Admin/UserManagement";

describe("UserManagement", () => {
  it("mount correctly", () => {
    cy.mount(<UserManagement />);
  });
  it("render user table", () => {
    cy.mount(<UserManagement />);
    cy.contains("Username");
  });
  it("load 10 row as default", () => {
    cy.mount(<UserManagement />);
    cy.get(".sc-cxabCf").should("contain.text", "10");
  });
  it.only("try to add role", () => {
    cy.mount(<UserManagement />);
    cy.get(
      '#cell-5-2 > [data-tag="allowRowEvents"] > .flex > .bg-green-600'
    ).click();
    cy.contains("Add Role");
    cy.get(".swal2-select").select("Admin");
    cy.get(".swal2-confirm").click();
    cy.get(".swal2-confirm").click();
  });
});
