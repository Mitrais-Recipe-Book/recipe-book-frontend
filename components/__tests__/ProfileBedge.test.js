import ProfileBedge from "../Comment/ProfileBedge";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

describe("Test ProfileBedge", () => {
  const data = {
    username: "user1",
  };

  it("render without crashing", () => {
    console.log("ENV = ", process.env.API_URL);
    render(<ProfileBedge username={data.username} />);
  });
  it("has username", () => {
    render(<ProfileBedge username={data.username} />);
    const linkElement = screen.getByText(/user1/i);
    expect(linkElement).toBeInTheDocument();
  });
});
