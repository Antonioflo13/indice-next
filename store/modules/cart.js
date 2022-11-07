import { createSlice } from "@reduxjs/toolkit";
import {setCookie} from "../../utils/cookie";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: null,
    show: false,
  },
  reducers: {
    setCartContent: (state, action) => {
      setCookie("cart", action.payload, 90);
      state.value = action.payload;
    },
    setShowCart: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setCartContent, setShowCart } = cartSlice.actions;

export default cartSlice.reducer;
