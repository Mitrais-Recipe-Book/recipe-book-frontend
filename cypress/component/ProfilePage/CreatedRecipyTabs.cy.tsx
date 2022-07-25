import { CreatedRecipeTabs } from "../../../components/ProfilePage/CreatedRecipeTabs"

describe("Created Recipy Tabs", ()=>{
    it("should not render any card",()=>{
        cy.mount(
            <CreatedRecipeTabs />
        )
        cy.get(".no-recipe-text")
    })
})