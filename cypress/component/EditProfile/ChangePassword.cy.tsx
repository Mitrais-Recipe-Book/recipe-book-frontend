import ChangePassword from "@components/EditProfile/ChangePassword";

const user = {
  id: 31,
  username: "naufal2",
};

describe("Change Password", () => {
  beforeEach(() => {
    cy.mount(<ChangePassword user={user} />);
    cy.wait(500);
  });
  it("Mount without crashing", () => {
    cy.contains("Change Password");
  });

  it("Prompt change password form", () => {
    cy.get(".bg-red-500").click();
    cy.get('[name="oldPassword"]');
    cy.get('[name="newPassword"]');
    cy.get('[name="confirmPassword"]');
    cy.get(".flex > .bg-red-500");
    cy.contains("Change Your Password");
  });

  it("Require old password", () => {
    cy.get(".bg-red-500").click();
    cy.get('[name="oldPassword"]').click();
    cy.get("#swal2-title").click();
    cy.contains("Require");
  });

  it("Require new password", () => {
    cy.get(".bg-red-500").click();
    cy.get('[name="newPassword"]').click();
    cy.get("#swal2-title").click();
    cy.contains("Require");
  });

  it("Require confirm password", () => {
    cy.get(".bg-red-500").click();
    cy.get('[name="confirmPassword"]').click();
    cy.get("#swal2-title").click();
    cy.contains("Require");
  });

  it("Password must be 6 chara or more", () => {
    cy.get(".bg-red-500").click();
    cy.get('[name="newPassword"]').type("123");
    cy.get("#swal2-title").click();
    cy.contains("Too short");
  });

  it("Confirm password must same as new password", () => {
    cy.get(".bg-red-500").click();
    cy.get('[name="confirmPassword"]').type("123");
    cy.get("#swal2-title").click();
    cy.contains("Passwords must match");
  });

  it("won't change if old password is wrong", () => {
    cy.get(".bg-red-500").click();
    cy.get('[name="oldPassword"]').type("123");
    cy.get('[name="newPassword"]').type("123456");
    cy.get('[name="confirmPassword"]').type("123456");
    cy.get(".flex > .bg-red-500").click();
    cy.contains("password does not match");
    cy.get(".swal2-confirm").click();
  });

  it("can change password", () => {
    cy.get(".bg-red-500").click();
    cy.get('[name="oldPassword"]').type("naufal12");
    cy.get('[name="newPassword"]').type("naufal12");
    cy.get('[name="confirmPassword"]').type("naufal12");
    cy.get(".flex > .bg-red-500").click();
    cy.contains("Password updated successfully");
    cy.get(".swal2-confirm").click();
  });
});
