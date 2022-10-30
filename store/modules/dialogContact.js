import { createSlice } from "@reduxjs/toolkit";

export const dialogContactSlice = createSlice({
    name: "dialogContact",
    initialState: {
        value: false,
    },
    reducers: {
        setDialogContactShow: (state, action) => {
            state.value = action.payload;
            document.body.style.overflow = action.payload ? "hidden" : "visible";
        },
    },
});

export const { setDialogContactShow } = dialogContactSlice.actions;

export default dialogContactSlice.reducer;
