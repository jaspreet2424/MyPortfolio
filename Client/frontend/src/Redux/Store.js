import { configureStore } from "@reduxjs/toolkit";
import { reducer, userReducer } from "./Reducer";

const store = configureStore({
  reducer: {
    GlobalState: reducer,
    User : userReducer,
  },
});

export{store};
