import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import CommentCard from "../Comment/CommentCard";

const dummyData = {
  username: "user1",
  comment: "comment1",
};

describe("Test Comment Card", () => {
  it("render without crashing", () => {
    <CommentCard {...dummyData} />;
  });
  it("show correct user", () => {
    render(<CommentCard {...dummyData} />);
    const linkElement = screen.getByText(/user1/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("show correct comment", () => {
    render(<CommentCard {...dummyData} />);
    const linkElement = screen.getByText(/comment1/i);
    expect(linkElement).toBeInTheDocument();
  });
});
