import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { SnackbarProvider } from "notistack";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./store/reducers";
import App from "./App";
import "./index.css";

const rootReducer = combineReducers({ auth: authReducer });
const persistConfig = {
  key: "noted-root-v2",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistStoreFunc = () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};

const { store, persistor } = persistStoreFunc();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
