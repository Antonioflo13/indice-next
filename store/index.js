import { configureStore } from "@reduxjs/toolkit";
//MODULES
import languageReducer from "./modules/language";
import shopifyReducer from "./modules/shopify";
import shopifyDialogContactReducer from "./modules/dialogContact";
import sidebarReducer from "./modules/sideBar";
import cartReducer from "./modules/cart";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    shopify: shopifyReducer,
    dialogContact: shopifyDialogContactReducer,
    sideBar: sidebarReducer,
    cart: cartReducer,
  },
});
