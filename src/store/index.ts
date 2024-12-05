import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/user/userSlice";
import authReducer from "@/store/slices/auth/authSlice";
import homeReducer from "@/store/slices/Home/homeSlice";
import checkoutReducer from "@/store/slices/Checkout/checkOutSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productDetailReducer from "./slices/Products/productSlice";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  home: homeReducer,
  checkout: checkoutReducer,
  productDetail: productDetailReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "home"], // Only persist 'auth' and 'user' slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
