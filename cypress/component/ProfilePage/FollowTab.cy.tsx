import { FollowTabs } from "@components/ProfilePage/FollowTabs";


let data:any = [{
    id: 10,
    email: "faristest@test.com",
    username: "faristest",
    fullName: "faris test",
    roles: ["User", "Request"],
}]

describe("Follow tab",() => {
    beforeEach(() => {
        data = 
            [{
                id: 10,
                email: "faristest@test.com",
                username: "faristest",
                fullName: "faris test",
                roles: ["User", "Request"],
            }]
        })
    it("should render the no user condition",()=> {
        cy.mount(
            <FollowTabs />
        )
        cy.contains("There is no user")
    })

    it("Should render user condition",() => {
        cy.mount(
            //@ts-ignore
            <FollowTabs key={Math.random()*Math.random()} followList={data} />
        )
        cy.contains(data[0].fullName)
        cy.contains("@"+data[0].username)
    })
})
