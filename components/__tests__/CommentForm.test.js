import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import CommentForm from "../Comment/CommentForm";

const user = "user1";
const recipeID = "1";

describe("Test Comment Form", () => {
  it("render without crashing", () => {
    render(<CommentForm />);
  });
  it("prompt to log in when not logged", () => {
    render(<CommentForm recipeId={recipeID} />);
    const linkElement = screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("show comment form when logged", () => {
    render(<CommentForm recipeId={recipeID} username={user} />);
    const linkElement = screen.getByTestId("comment-field");
    expect(linkElement).toBeInTheDocument();
  });
});
