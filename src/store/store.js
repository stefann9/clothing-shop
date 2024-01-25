import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
// import logger from "redux-logger";
// import { loggerMiddleware } from "./middleware/logger";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === "development" && logger, thunk].filter(Boolean);

const composeEngancer =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEngancer(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
