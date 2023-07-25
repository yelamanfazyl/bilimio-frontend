import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/useAuth";

const rootReducer = combineReducers({
  authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};
