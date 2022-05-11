import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const url = "https://recipyb-dev.herokuapp.com/api/v1/tag";

export const getTags = createAsyncThunk(
    'tag/getTags',
    async () => {
        return axios.get(url)
            .then(res => res.data.payload)
            .catch(err => err.response.data);
    }
)

interface Tag{
    tagsId: number;
    tagsName: string;
    
}
const initialState = {
    allTags: [],
}
const tagReducer = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTags: (state, action) => {

        },
        removeTags: (state) => {
            state.allTags = [];
        }
    },
    extraReducers:{
        //@ts-ignore
        [getTags.fulfilled]: (state, action) => {
            state.allTags = action.payload;
        }
    }
})
export const {addTags} = tagReducer.actions
export default tagReducer.reducer;
