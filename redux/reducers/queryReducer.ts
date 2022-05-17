import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";


const url = "https://recipyb-dev.herokuapp.com/api/v1/";

export const getTags = createAsyncThunk("tag/getTags", async () => {
  return axios
    .get(url+"tag")
    .then((res) => res.data.payload)
    .catch((err) => err.response.data);
});
//@ts-ignore
export const sendQuery = createAsyncThunk(
  "search/sendQuery",
  async (tags, thunkAPI) => {
    //@ts-ignore
    const queryRecipeName = thunkAPI.getState().query.queryRecipeName;
    //@ts-ignore
    const queryCreator = thunkAPI.getState().query.queryCreator;
    //@ts-ignore
    const queryTags = Array.from(thunkAPI.getState().query.queryTags);
    const searchUrl = `search?title=${queryRecipeName}&author=${queryCreator}&${
      queryTags.length > 0 ?
      queryTags
      .map((tag) => {
        return `tagId=${tag}&`;
      })
      .join(""):
      "tagId=&"}page=0`;


    return axios.get(url+searchUrl).then((res) => res.data.payload.content);
  }
);

interface Tag {
  tagsId: number;
  tagsName: string;
}
const initialState = {
  allTags: [],
  queryTags: [],
  queryCreator: "",
  queryRecipeName: "",
  queryRecipes: [],
};
//@ts-ignore
const queryReducer = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQueryRecipeName: (state, action) => {
      state.queryRecipeName = action.payload;
    },
    clearQueryRecipeName: (state) => {
      state.queryRecipeName = "";
    },
    setQueryCreator: (state, action) => {
      state.queryCreator = action.payload;
    },
    clearQueryCreator: (state) => {
      state.queryCreator = "";
    },
    addTagsToQuery: (state, action) => {
      //@ts-ignore
      if (state.queryTags.includes(action.payload)) {
      } else {
        //@ts-ignore
        state.queryTags.push(action.payload);
      }
    },
    removeTagsFromQuery: (state, action) => {
      state.queryTags = state.queryTags.filter((tag) => tag !== action.payload);
    },
    clearQueryTags: (state) => {
      state.queryTags = []
    },
    setRecipesQuery: (state, action) => {
      state.queryRecipes = action.payload;
    },
    clearRecipesQuery: (state) => {
      state.queryRecipes = [];
    },
  },
  extraReducers: {
    //@ts-ignore
    [getTags.fulfilled]: (state, action) => {
      state.allTags = action.payload;
    },
    //@ts-ignore
    [sendQuery.fulfilled]: (state, action) => {
      state.queryRecipes = action.payload;
    }
  },
});
export const {
  setQueryRecipeName,
  addTagsToQuery,
  setRecipesQuery,
  removeTagsFromQuery
} = queryReducer.actions;
export default queryReducer.reducer;
