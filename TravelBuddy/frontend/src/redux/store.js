import { configureStore } from "@reduxjs/toolkit";

import UserActivity from "./slices/userActivitySlice.js";
import UserAuth from "./slices/userAuthSlice.js";

const store = configureStore({
   reducer: {
      userAuth: UserAuth,
      userActivity: UserActivity,
   },
   devTools: true,
});

export default store;
