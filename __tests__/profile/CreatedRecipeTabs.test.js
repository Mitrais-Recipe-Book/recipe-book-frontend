import { CreatedRecipeTabs } from "../../components/ProfilePage/CreatedRecipeTabs";
import { screen,render,queryByAttribute } from "@testing-library/react";
import "@testing-library/jest-dom";

describe ("Created Recipe Tabs", () => {
    const data = {
        recipesData:[
            {
                title:"Test recipe",
                overview:"Test recipe overview",
                tags:[{
                    id:1,
                    name:"breakfast"
                }]
            }
        ]
    }

    it("should render the no recipe condition", () => {
        const getById = queryByAttribute.bind(null, 'id');
        const dom = render(<CreatedRecipeTabs />);
        const noRecipe = getById(dom.container, 'no-recipe-text');
        expect(noRecipe).toBeInTheDocument();
    })

})