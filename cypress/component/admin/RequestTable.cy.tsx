import RequestTable from "@components/Admin/RequestTable";

const loading = true;

function removeUser(username: string): void {
  data = data.filter((user) => user.username !== username);
}
let data = [
  {
    id: 10,
    email: "faristest@test.com",
    username: "faristest",
    fullName: "faris test",
    roles: ["User", "Request"],
  },
];

describe("RequestTable", () => {
  beforeEach(() => {
    data = [
      {
        id: 10,
        email: "faristest@test.com",
        username: "faristest",
        fullName: "faris test",
        roles: ["User", "Request"],
      },
    ];
  });
  it("Mount without error", () => {
    cy.mount(
      <RequestTable data={data} loading={loading} removeUser={removeUser} />
    );
  });

  it("Loading screen loaded", () => {
    cy.mount(
      <RequestTable data={data} loading={loading} removeUser={removeUser} />
    );
    cy.contains("Loading...");
  });

  it("show empty data message", () => {
    cy.mount(
      <RequestTable data={[]} loading={false} removeUser={removeUser} />
    );
    cy.contains("There are no records to display");
  });

  it("Data shown when loaded", () => {
    cy.mount(
      <RequestTable data={data} loading={false} removeUser={removeUser} />
    );
    cy.contains("Username");
  });

  it("Prompt confirmatin screen on accept", () => {
    cy.mount(
      <RequestTable data={data} loading={false} removeUser={removeUser} />
    );
    cy.get(".bg-green-600").click();
    cy.contains("You want to accept request of faristest");
    cy.get(".swal2-cancel").click();
  });

  it("Prompt confirmatin screen on reject", () => {
    cy.mount(
      <RequestTable data={data} loading={false} removeUser={removeUser} />
    );
    cy.get(".bg-red-600").click();
    cy.contains("You want to reject request of faristest");
    cy.get(".swal2-cancel").click();
  });

  it("Accept the request", () => {
    cy.mount(
      <RequestTable data={data} loading={false} removeUser={removeUser} />
    );
    cy.get(".bg-green-600").click();
    cy.get(".swal2-confirm").click();
    cy.contains("Request has been approved");
    cy.get(".swal2-confirm").click();
  });

  it("Reject the request", () => {
    cy.mount(
      <RequestTable data={data} loading={false} removeUser={removeUser} />
    );
    cy.get(".bg-red-600").click();
    cy.get(".swal2-confirm").click();
    cy.contains("Request has been rejected");
    cy.get(".swal2-confirm").click();
  });
});
