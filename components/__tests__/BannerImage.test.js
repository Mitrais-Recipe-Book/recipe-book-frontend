import BannerImage from "../RecipeDetail/BannerImage";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

describe("Test BannerImage that have href", () => {
  const props = {
    id: 1,
    alt: "banner-recipe-es-teh-anget",
    href: true,
  };
  beforeAll(() => {
    process.env.API_URL = "https://recipyb-dev.herokuapp.com/api/v1/";
  });

  it("render without crashing", () => {
    render(<BannerImage {...props} />);
    screen.debug();
  });
  it.todo("has href");
  it("match the snapshot", () => {
    const tree = renderer.create(<BannerImage {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test BannerImage that do not have href", () => {
  const props = {
    id: 1,
    alt: "banner-recipe-es-teh-anget",
    href: false,
  };
  beforeAll(() => {
    process.env.API_URL = "https://recipyb-dev.herokuapp.com/api/v1/";
  });

  it("render without crashing", () => {
    render(<BannerImage {...props} />);
  });
  it("has alt", () => {
    render(<BannerImage {...props} />);
    const linkElement = screen.getByAltText(/banner-recipe-es-teh-anget/i);
    expect(linkElement).toBeInTheDocument();
  });
  it.todo("do not have href");
  it("match the snapshot", () => {
    const tree = renderer.create(<BannerImage {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
