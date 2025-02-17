"use client";
import store from "@/store/store";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const persister = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {" "}
        {children}
      </PersistGate>
    </Provider>
  );
}
