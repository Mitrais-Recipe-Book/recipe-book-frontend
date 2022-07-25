import { ProfileInfo } from "@components/ProfilePage/ProfileInfo";

describe("Profile info card",() => {
    const data = {
        response :{
            fullName: "Faris Adam",
            id: 11,
            totalRecipes:"2",
            recipeLikes:"0",
            followers:"2"
        }
    }

    const dataSession ={
        user:{
            id:10
        }
    }

    it("should render profile info from prop",() => {
        cy.mount(
            <ProfileInfo userData={data} />
        )

        cy.contains("Profile")
        cy.contains(data.response.fullName)
        cy.contains(data.response.totalRecipes + " recipes")
        cy.contains(data.response.recipeLikes + " likes")
        cy.contains(data.response.followers + " followers")
    })

    it("should render edit button", () => {
        cy.mount(
            <ProfileInfo userData={data} session={dataSession} creatorId={6} />
        )
        cy.contains("Edit Profile")
    })

    it("should render unfollow button",() => {
        const dataQueryParam = "faristest2"

        cy.mount(
            <ProfileInfo userData={data} dataQueryParam={dataQueryParam} session={dataSession} creatorId={6} />
        )
        
        cy.contains("Unfollow")
    })

    it("should render follow button",() => {
        const dataQueryParam = "bernard1"
        const data = {
            response :{
                id: 4
            }
        }
        cy.mount(
            <ProfileInfo userData={data} dataQueryParam={dataQueryParam} session={dataSession} creatorId={6} />
        )
        
        cy.contains("Follow")
    })
})