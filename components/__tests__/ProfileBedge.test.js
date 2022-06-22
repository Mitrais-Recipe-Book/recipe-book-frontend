import ProfileBedge from "../Comment/ProfileBedge";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

describe("Test ProfileBedge", () => {
  const props = {
    username: "user1",
  };

  it("render without crashing", () => {
    render(<ProfileBedge username={props.username} />);
  });
});
