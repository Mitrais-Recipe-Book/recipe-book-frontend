import { ProfileInfo } from "@components/ProfilePage/ProfileInfo";

describe("Profile info card",() => {
    const data = {
        response :{
            fullName: "Faris Adam",
            totalRecipes:"2",
            recipeLikes:"0",
            followers:"2"
        }
    }
    const session ={
        user:{
            id:9
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
            <ProfileInfo userData={data} session={session} creatorId={6} />
        )
        cy.contains("Edit Profile")
    })

    it("should render follow/unfollow button",() => {
        const dataQueryParam = "faristest2"

        cy.mount(
            <ProfileInfo userData={data} dataQueryParam={dataQueryParam} session={session} creatorId={6}/>
        )
        
        cy.contains("Please Login To Follow This Creator")
    })
})