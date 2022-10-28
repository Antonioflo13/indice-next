import { createSlice } from "@reduxjs/toolkit";
import Client from "shopify-buy";
import { useSelector } from "react-redux";

export const shopifySlice = createSlice({
  name: "shopify",
  initialState: {
    client: null,
    language: "it",
    checkout: null,
  },
  reducers: {
    setClient: state => {
      state.client = JSON.stringify(
        Client.buildClient({
          domain: process.env.SHOPIFY_STORE_DOMAIN,
          storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
          language: state.language,
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
