import { createSlice } from "@reduxjs/toolkit";

export const dialogContactSlice = createSlice({
    name: "dialogContact",
    initialState: {
        value: false,
        product: {},
    },
    reducers: {
        setDialogContactShow: (state, action) => {
            state.value = action.payload;
            document.body.style.overflow = action.payload ? "hidden" : "visible";
        },
        setDialogContactProduct: (state, action) => {
            state.product = action.payload;
        }
    },
});

export const { setDialogContactShow, setDialogContactProduct } = dialogContactSlice.actions;

export default dialogContactSlice.reducer;
