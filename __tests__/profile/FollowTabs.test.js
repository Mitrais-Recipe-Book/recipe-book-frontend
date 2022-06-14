import { FollowTabs } from "../../components/ProfilePage/FollowTabs";
import { screen,render } from "@testing-library/react";
import "@testing-library/jest-dom";


describe ("Follow Tabs", () => {
    const data = [
        {
            fullName : "Faris Adam",
            username : "farisadam",
        }
    ]
    it ("should render the no user condition ", () => {
        render(<FollowTabs />);
        expect(screen.getByText("There is no user")).toBeInTheDocument();
    })

    it("should render follower card", () => {
        render(<FollowTabs key={Math.random()*Math.random()} followList={data} />);
        expect(screen.getByText(data[0].fullName)).toBeInTheDocument();
        expect(screen.getByText("@"+data[0].username)).toBeInTheDocument();
    })
})