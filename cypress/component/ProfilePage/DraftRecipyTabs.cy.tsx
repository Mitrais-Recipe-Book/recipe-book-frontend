import { DraftRecipeTabs } from "../../../components/ProfilePage/DraftRecipeTabs"

describe("Draft Recipy Tabs", ()=>{
    it("should not render any card",()=>{
        cy.mount(
            <DraftRecipeTabs />
        )
        cy.get(".no-recipe-text")
    })
})