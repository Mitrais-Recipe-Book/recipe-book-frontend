import RecipeCard from "../RecipeCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

describe("Test RecipeCard on index", () => {
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
  it("has recipe name", () => {
    render(<RecipeCard recipe={recipe} />);
    const linkElement = screen.getByText(/Es Teh Anget/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("has recipe description", () => {
    render(<RecipeCard recipe={recipe} />);
    const linkElement = screen.getByText(/Enak diminum untuk buka puasa/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("has recipe author", () => {
    render(<RecipeCard recipe={recipe} />);
    const linkElement = screen.getByText(/User 1/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("try to load banner image", () => {
    render(<RecipeCard recipe={recipe} />);
    const linkElement = screen.getByText(/Loading Banner Image.../i);
    expect(linkElement).toBeInTheDocument();
  });
  it("try to load profile image", () => {
    render(<RecipeCard recipe={recipe} />);
    const linkElement = screen.getByText(/Loading Profile Image.../i);
    expect(linkElement).toBeInTheDocument();
  });
  it("match the snapshot", () => {
    const tree = renderer.create(<RecipeCard recipe={recipe} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test RecipeCard on recipe detail", () => {
  const recipe = {
    id: 1,
    recipeName: "Es Teh Anget",
    description: "Enak diminum untuk buka puasa",
  };
  it("render without crashing", () => {
    render(<RecipeCard recipe={recipe} />);
  });
  it("has recipe name", () => {
    render(<RecipeCard recipe={recipe} />);
    const linkElement = screen.getByText(/Es Teh Anget/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("has recipe description", () => {
    render(<RecipeCard recipe={recipe} />);
    const linkElement = screen.getByText(/Enak diminum untuk buka puasa/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("don't have recipe author", () => {
    render(<RecipeCard recipe={recipe} />);
    const linkElement = screen.queryByText(/User 1/i);
    expect(linkElement).not.toBeInTheDocument();
  });
  it("match the snapshot", () => {
    const tree = renderer.create(<RecipeCard recipe={recipe} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
