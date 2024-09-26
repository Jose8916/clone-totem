import { createSlice } from "@reduxjs/toolkit";

export const dataServicesSlice = createSlice({
  name: "dataServices",
  initialState: [],
  reducers: {
    setdataServices: (state, action) => action.payload
  }
});

export const { setdataServices } = dataServicesSlice.actions;

export default dataServicesSlice.reducer;
