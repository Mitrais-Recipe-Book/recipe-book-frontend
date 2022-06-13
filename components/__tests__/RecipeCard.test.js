import RecipeCard from "../RecipeCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

describe("Test RecipeCard", () => {
  const recipe = {
    id: 1,
    recipeName: "Es Teh Anget",
    description: "Enak diminum untuk buka puasa",
    recipeViews: 5,
    author: {
      username: "user1",
      fullName: "User 1",
      authorFollowers: 5,
    },
  };
  it("render without crashing", () => {
    render(<RecipeCard recipe={recipe} />);
  });
});
