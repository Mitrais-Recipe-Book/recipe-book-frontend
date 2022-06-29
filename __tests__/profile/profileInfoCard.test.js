import { ProfileInfo } from "../../components/ProfilePage/ProfileInfo";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ProfileCard", () => {
  const data = {
    response: {
      fullName: "Faris Adam",
      totalRecipes: "2",
      recipeLikes: "0",
      followers: "2",
    },
  };
  const session = {
    user: {
      id: 9,
    },
  };

  it("should render the profile info card with data from props", () => {
    render(<ProfileInfo userData={data} />);
    expect(screen.getByText("Your Profile")).toBeInTheDocument();
    expect(screen.getByText(data.response.fullName)).toBeInTheDocument();
    expect(
      screen.getByText(data.response.totalRecipes + " recipes")
    ).toBeInTheDocument();
    expect(
      screen.getByText(data.response.recipeLikes + " likes")
    ).toBeInTheDocument();
    expect(
      screen.getByText(data.response.followers + " followers")
    ).toBeInTheDocument();
  });

  it("should render edit profile", () => {
    render(<ProfileInfo userData={data} session={session} creatorId={6} />);
    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
  });

  it("should render follow/unfollow button", () => {
    const dataQueryParam = "faristest2";

    render(
      <ProfileInfo
        userData={data}
        dataQueryParam={dataQueryParam}
        session={session}
        creatorId={6}
      />
    );
    expect(
      screen.getByText("Please Login To Follow This Creator")
    ).toBeInTheDocument();
  });
});
