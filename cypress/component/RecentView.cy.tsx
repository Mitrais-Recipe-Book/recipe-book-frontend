import RecentView from "@components/RecentView";

const recipes = [
  {
    id: 1,
    recipeName: "Recipe 1",
    description: "This is recipe 1",
    recipeViews: 10,
    author: {
      username: "username1",
      fullName: "fullName1",
      authorFollowers: 10,
    },
  },
];

describe("Recent View", () => {
  it("mount correctly", () => {
    cy.mount(
      <RecentView loading={false} recipes={recipes} username={"user1"} />
    );
  });
  it("show loading", () => {
    cy.mount(
      <RecentView loading={true} recipes={recipes} username={"user1"} />
    );
    cy.contains("Loading...");
  });
  it("show no recipe", () => {
    cy.mount(<RecentView loading={false} recipes={[]} username={"user1"} />);
    cy.contains("No Recipe");
  });
  it("prompt to login when no user data found", () => {
    cy.mount(<RecentView loading={false} recipes={[]} username={""} />);
    cy.contains("Please login to continue");
  });
});
