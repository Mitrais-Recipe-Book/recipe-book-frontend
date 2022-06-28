import { DraftRecipeTabs } from "../../components/ProfilePage/DraftRecipeTabs";
import { screen,render,queryByAttribute } from "@testing-library/react";
import "@testing-library/jest-dom";

describe ("Created Recipe Tabs", () => {
    const data = {
        draftRecipesData:[
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
        const dom = render(<DraftRecipeTabs />);
        const noRecipe = getById(dom.container, 'no-recipe-text');
        expect(noRecipe).toBeInTheDocument();
    })

})