import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { enableMapSet } from "immer";
import  Router  from "next/router";
import { join } from "path";

enableMapSet();

const url = "https://recipyb-dev.herokuapp.com/api/v1/tag";

export const getTags = createAsyncThunk("tag/getTags", async () => {
  return axios
    .get(url)
    .then((res) => res.data.payload)
    .catch((err) => err.response.data);
});
//@ts-ignore
export const getRecipesByTags = createAsyncThunk(
  "tag/getRecipesByTags",
  async (tags, thunkAPI) => {
    //@ts-ignore
    console.log("from other world", thunkAPI.getState().tags.queryTags);
    //@ts-ignore
    const queryTags = Array.from(thunkAPI.getState().tags.queryTags);
    const url = `https://recipyb-dev.herokuapp.com/api/v1/recipe/search?title=&author=&${queryTags
      .map((tag) => {
        return `tagId=${tag}&`;
      })
      .join("")}page=0`;
    //   console.log(url);
    
    axios.get(url).then((res) => {
      //@ts-ignore
      console.log("resep=", res.data.payload.content);
      //@ts-ignore
      thunkAPI.dispatch(setRecipesQuery(res.data.payload.content));
    //   Router.push( `/tag?${queryTags.join("-")}`);
    });
  }
);

interface Tag {
  tagsId: number;
  tagsName: string;
}
interface TagState {
  allTags: Tag[];
  queryTags: Set<Number>;
  queryRecipes: [];
}
const initialState: TagState = {
  allTags: [],
  queryTags: new Set(),
  queryRecipes: [],
};
//@ts-ignore
const tagReducer = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTagsToQuery: (state, action) => {
      // if (typeof state.queryTags !== 'Set')
      try {
        state.queryTags.add(action.payload);
      } catch (error) {
        state.queryTags = new Set();
        state.queryTags.add(action.payload);
      }
      console.log(state.queryTags);
    //   Router.push( `/tag?${state.queryTags}`);
    },
    removeTagsFromQuery: (state, action) => {
      state.queryTags.delete(action.payload);
    },
    removeAllQueryTags: (state) => {
      state.queryTags = new Set();
      state.queryTags.clear();
    },
    setRecipesQuery: (state, action) => {
        state.queryRecipes = action.payload;
    },
    removeRecipesQuery: (state) => {
        state.queryRecipes = [];
    }
  },
  extraReducers: {
    //@ts-ignore
    [getTags.fulfilled]: (state, action) => {
      state.allTags = action.payload;
    },
    //@ts-ignore
    [getRecipesByTags.fulfilled]: (state, action) => {
      state.queryRecipes = action.payload;
    },
  },
});
export const { addTagsToQuery, removeAllQueryTags, setRecipesQuery, removeRecipesQuery } = tagReducer.actions;
export default tagReducer.reducer;
