import { createSlice } from "@reduxjs/toolkit";

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    value: false,
  },
  reducers: {
    setSideBarShow: (state, action) => {
      state.value = action.payload;
      document.body.style.overflow = action.payload ? "hidden" : "visible";
    },
  },
});

export const { setSideBarShow } = sideBarSlice.actions;

export default sideBarSlice.reducer;
