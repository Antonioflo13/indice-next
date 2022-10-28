import { configureStore } from "@reduxjs/toolkit";
//MODULES
import languageReducer from "./modules/language";
import shopifyReducer from "./modules/shopify";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    shopify: shopifyReducer,
  },
});
