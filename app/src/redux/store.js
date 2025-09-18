import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import productSlice from "./products/productSlice";
import cartSlice from "./cart/cartSlice"


const persistConfig = {
  key: "root",
  storage,
  whitelist: [], 
};

const rootReducer = combineReducers({
  users: userReducer,
  products: productSlice,
  carts: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export default store;
