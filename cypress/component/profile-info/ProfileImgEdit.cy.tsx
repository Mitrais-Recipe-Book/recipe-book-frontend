import ChangePP from "@components/EditProfile/ChangePP";

describe("Change Profile Picture Component", () => {
  it("Mount without crash", () => {
    cy.mount(<ChangePP username="user1" />);
  });
  it("Change profile picture on click", () => {
    cy.mount(<ChangePP username="user1" />);
    cy.get(".rounded-full").click();
    cy.get("#swal2-title").should("contain.text", "Change Profile Picture");
  });
});
