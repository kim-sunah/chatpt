import { createSlice } from "@reduxjs/toolkit";

const searchslice = createSlice({
    name : "search",
    initialState : {search : ""},
    reducers :{
        search(state,action){
            state.search = action.payload
        },
        searchlist(state ,action){

        }
    }
})

export const searchActions = searchslice.actions;
export default searchslice