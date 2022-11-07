import { configureStore } from "@reduxjs/toolkit";
//MODULES
import languageReducer from "./modules/language";
import dialogContactReducer from "./modules/dialogContact";
import sidebarReducer from "./modules/sideBar";
import cartReducer from "./modules/cart";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    dialogContact: dialogContactReducer,
    sideBar: sidebarReducer,
    cart: cartReducer,
  },
});
