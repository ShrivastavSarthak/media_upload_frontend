import { configureStore } from "@reduxjs/toolkit";
import { persistedReducer } from "./reducers";
import { DataServices } from "../services/data-service";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        serializableCheck: false,
        ignoredActionPaths: ["meta.arg", "payload", "error"],
        ignoredPaths: ["items.dates"],
      },
    }).concat(DataServices.middleware) as any,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
