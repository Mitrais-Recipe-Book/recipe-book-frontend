import LogIn from "pages/sign-in";

import "@testing-library/jest-dom"

import { fireEvent,screen,render } from "@testing-library/react";

describe ("Sign In", () => {
    it ("should render the sign in page", () => {
        render(<LogIn />);
        expect(screen.getByLabelText('Sign In')).toBeInTheDocument();
    })
})