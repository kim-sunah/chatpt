import {configureStore} from "@reduxjs/toolkit"
import searchslice from "./search.action"



const store = configureStore({
    reducer: { search: searchslice.reducer },
  });
export default store