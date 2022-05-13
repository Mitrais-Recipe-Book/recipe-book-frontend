import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { enableMapSet } from "immer";
import Router from "next/router";

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
    const queryTags = Array.from(thunkAPI.getState().tags.queryTags);
    const url = `https://recipyb-dev.herokuapp.com/api/v1/recipe/search?title=&author=&${
      queryTags.length > 0 ?
      queryTags
      .map((tag) => {
        return `tagId=${tag}&`;
      })
      .join(""):
      "tagId=&"}page=0`;


    return axios.get(url).then((res) => res.data.payload.content);
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
      try {
        state.queryTags.add(action.payload);
      } catch (error) {
        state.queryTags = new Set();
        state.queryTags.add(action.payload);
      }
    },
    removeTagsFromQuery: (state, action) => {
      state.queryTags.delete(action.payload);
      console.log("after remove:", state.queryTags);
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
    },
  },
  extraReducers: {
    //@ts-ignore
    [getTags.fulfilled]: (state, action) => {
      state.allTags = action.payload;
    },
    //@ts-ignore
    [getRecipesByTags.fulfilled]: (state, action) => {
      state.queryRecipes = action.payload;
      Router.push(`/tag/id=${Array.from(state.queryTags).join("&")}`);
    },
  },
});
export const {
  addTagsToQuery,
  removeAllQueryTags,
  setRecipesQuery,
  removeRecipesQuery,
  removeTagsFromQuery
} = tagReducer.actions;
export default tagReducer.reducer;
