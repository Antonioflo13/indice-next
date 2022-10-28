import { configureStore } from "@reduxjs/toolkit";
//MODULES
import languageReducer from "./modules/language";
import shopifyReducer from "./modules/shopify";
import shopifyDialogContactReducer from "./modules/dialogContact";
import sidebarReducer from "./modules/sideBar";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    shopify: shopifyReducer,
    dialogContact: shopifyDialogContactReducer,
    sideBar: sidebarReducer,
    cart: sidebarReducer,
  },
});
