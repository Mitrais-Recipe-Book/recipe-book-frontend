import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";

const url = "https://recipyb-dev.herokuapp.com/api/v1/";

export const getTags = createAsyncThunk("tag/getTags", async () => {
  return axios
    .get(url + "tag")
    .then((res) =>
      res.data.payload.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        query: false,
      }))
    )
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
    const queryTags = thunkAPI
      .getState()
      .query.allTags.filter((tag: any) => tag.query);
    const queryTagsId =
      queryTags.length > 0
        ? queryTags
            .map((tag: Tag) => {
              return `tagId=${tag.id}&`;
            })
            .join("")
        : "tagId=&";
    const searchUrl = `recipe/search?title=${queryRecipeName}&author=${queryCreator}&${queryTagsId}page=0`;

    Router.push(
      //@ts-ignore
      `/search/name?${queryRecipeName}&creator?${queryCreator}&${queryTagsId}`
    );

    return axios.get(url + searchUrl).then((res) => res.data.payload);
  }
);

export const getMoreRecipes = createAsyncThunk(
  "search/getMoreRecipes",
  async (page, thunkAPI) => {
    //@ts-ignore
    const queryRecipeName = thunkAPI.getState().query.queryRecipeName;
    //@ts-ignore
    const queryCreator = thunkAPI.getState().query.queryCreator;
    //@ts-ignore
    const queryTags = thunkAPI
      .getState()
      .query.allTags.filter((tag: any) => tag.query);
    const queryTagsId =
      queryTags.length > 0
        ? queryTags
            .map((tag: Tag) => {
              return `tagId=${tag.id}&`;
            })
            .join("")
        : "tagId=&";
    //@ts-ignore
    const nextPage = thunkAPI.getState().query.page + 1;
    const searchUrl = `recipe/search?title=${queryRecipeName}&author=${queryCreator}&${queryTagsId}page=${nextPage}`;

    return axios.get(url + searchUrl).then((res) => res.data.payload);
  }
);

interface Tag {
  id: number;
  name: string;
  query: boolean;
}
const initialState = {
  allTags: [],
  queryCreator: "",
  queryRecipeName: "",
  queryRecipes: [],
  isLastPage: false,
  page: 0,
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
      state.allTags.forEach((tag: Tag) => {
        if (tag.id === action.payload.id) {
          tag.query = true;
        }
      });
    },
    removeTagsFromQuery: (state, action) => {
      state.allTags.forEach((tag: Tag) => {
        if (tag.id === action.payload.id) {
          tag.query = false;
        }
      });
    },
    clearQueryTags: (state) => {
      state.allTags.forEach((tag: Tag) => {
        tag.query = false;
      });
    },
    clearQuery: (state) => {
      state.queryRecipeName = "";
      state.queryCreator = "";
      state.allTags.forEach((tag: Tag) => {
        tag.query = false;
      });
    },
    clearQueryExceptName: (state) => {
      state.queryCreator = "";
      state.allTags.forEach((tag: Tag) => {
        tag.query = false;
      });
    },
    setRecipesQuery: (state, action) => {
      state.queryRecipes = action.payload.data;
      state.isLastPage = action.payload.islast;
    },
    clearRecipesQuery: (state) => {
      state.queryRecipes = [];
      state.isLastPage = false;
      state.page = 0;
    },
  },
  extraReducers: {
    //@ts-ignore
    [getTags.fulfilled]: (state, action) => {
      state.allTags = action.payload;
    },
    //@ts-ignore
    [sendQuery.fulfilled]: (state, action) => {
      state.queryRecipes = action.payload.data;
      state.isLastPage = action.payload.islast;
      state.page = action.payload.currentPage;
    },
    //@ts-ignore
    [getMoreRecipes.fulfilled]: (state, action) => {
      state.queryRecipes = [...state.queryRecipes, ...action.payload.data];
      state.isLastPage = action.payload.islast;
      state.page++;
    },
  },
});
export const {
  setQueryRecipeName,
  addTagsToQuery,
  setRecipesQuery,
  removeTagsFromQuery,
  clearQuery,
  clearQueryExceptName,
  setQueryCreator,
} = queryReducer.actions;
export default queryReducer.reducer;
