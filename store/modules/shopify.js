import { createSlice } from "@reduxjs/toolkit";
import Client from "shopify-buy";

export const shopifySlice = createSlice({
  name: "shopify",
  initialState: {
    client: null,
    checkout: null,
  },
  reducers: {
    setClient: (state, action) => {
      state.client = JSON.stringify(
        Client.buildClient({
          domain: process.env.SHOPIFY_STORE_DOMAIN,
          storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
          language: action.payload,
        })
      );
    },
    setShopifyCheckout: (state, action) => {
      state.checkout = JSON.stringify(action.payload);
    },
  },
});

export const { setClient, setShopifyCheckout } = shopifySlice.actions;

export default shopifySlice.reducer;
