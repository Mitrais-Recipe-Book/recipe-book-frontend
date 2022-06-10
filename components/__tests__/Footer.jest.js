import Footer from "../Footer";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";

export {};

describe("Test Footer", () => {
  it("render without crashing", () => {
    render(<Footer />);
  });
  it.todo("has recipy copyright");
  it("mathc the snapshot", () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
