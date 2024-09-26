import { createSlice } from "@reduxjs/toolkit";

export const dataMallaSlice = createSlice({
  name: "mallaServices",
  initialState: [],
  reducers: {
    setMallaServices: (state, action) => action.payload
  }
});

export const {  setMallaServices } = dataMallaSlice.actions;

export default dataMallaSlice.reducer;