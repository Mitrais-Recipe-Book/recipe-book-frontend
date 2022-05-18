import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";


const url = "https://recipyb-dev.herokuapp.com/api/v1/";

export const getTags = createAsyncThunk("tag/getTags", async () => {
  return axios
    .get(url+"tag")
    .then((res) => res.data.payload.map((tag:any) => ({
      id: tag.id,
      name: tag.name,
      query: false,
    })))
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
    const searchUrl = `recipe/search?title=${queryRecipeName}&author=${queryCreator}&${
      queryTags.length > 0 ?
      queryTags
      .map((tag) => {
        return `tagId=${tag}&`;
      })
      .join(""):
      "tagId=&"}page=0`;
    
    console.log("searchUrl:",searchUrl);


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
      
      state.allTags.forEach((tag) => {
        //@ts-ignore
        if (tag.id === action.payload.id) {
          console.log("tag:",tag);
          //@ts-ignore
          tag.query = true;
        }
      });
    },
    removeTagsFromQuery: (state, action) => {
      state.allTags.forEach((tag) => {
        //@ts-ignore
        if (tag.id === action.payload.id) {
          console.log("tag:",tag);
          //@ts-ignore
          tag.query = false;
        }
      });
    },
    clearQueryTags: (state) => {
      state.queryTags = []
    },
    clearQuery: (state) => {
      state.queryRecipeName = "";
      state.queryCreator = "";
      state.queryTags = [];
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
  removeTagsFromQuery,
  clearQuery,
} = queryReducer.actions;
export default queryReducer.reducer;
