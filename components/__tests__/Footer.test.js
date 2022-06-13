import Footer from "../Footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

export {};

describe("Test Footer", () => {
  it("render without crashing", () => {
    render(<Footer />);
  });
  it("has recipy copyright", () => {
    render(<Footer />);
    const linkElement = screen.getByText(/Copyright ©2022 Recipy/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("mathc the snapshot", () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
