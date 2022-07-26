import PromptLogin from "@components/PromptLogin";
import { createRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context";

describe("Prompt Login", () => {
  it("mount correctly", () => {
    cy.mount(<PromptLogin />);
  });
  it("route to login page", () => {
    const router = {
      pathname: "/testPath",
      route: "/testPath",
      query: {},
      asPath: "/testPath",
      components: {},
      isFallback: false,
      basePath: "",
      events: { emit: cy.spy(), off: cy.spy(), on: cy.spy() },
      push: cy.spy(),
      replace: cy.spy(),
      reload: cy.spy(),
      back: cy.spy(),
      prefetch: cy.spy(),
      beforePopState: cy.spy(),
    };
    cy.mount(
      // @ts-ignore
      <RouterContext.Provider value={router}>
        <PromptLogin />
      </RouterContext.Provider>
    );
    cy.contains("Login")
      .click()
      .then(() => {
        expect(router.push).to.be.calledWith("/sign-in");
      });
  });

  it("route to sign-up page", () => {
    const router = {
      pathname: "/testPath",
      route: "/testPath",
      query: {},
      asPath: "/testPath",
      components: {},
      isFallback: false,
      basePath: "",
      events: { emit: cy.spy(), off: cy.spy(), on: cy.spy() },
      push: cy.spy(),
      replace: cy.spy(),
      reload: cy.spy(),
      back: cy.spy(),
      prefetch: cy.spy(),
      beforePopState: cy.spy(),
    };
    cy.mount(
      // @ts-ignore
      <RouterContext.Provider value={router}>
        <PromptLogin />
      </RouterContext.Provider>
    );
    cy.contains("Sign up")
      .click()
      .then(() => {
        expect(router.push).to.be.calledWith("/sign-up");
      });
  });
});
