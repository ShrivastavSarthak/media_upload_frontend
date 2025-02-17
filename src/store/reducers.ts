import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import { DataServices } from "../services/data-service";
import { userSlice } from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["user"],
};

const Reducer = combineReducers({
  user: userSlice.reducer,
  [DataServices.reducerPath]: DataServices.reducer,
});

export const persistedReducer = persistReducer(persistConfig, Reducer);
