import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  login: null,
  lastActivityTime: null,
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return initialState;
  }
};

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (error) {
    // Manejo de errores al guardar en localStorage
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: loadStateFromLocalStorage(),
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setLogin: (state, action) => {
      state.login = action.payload;
      state.isLoading = false;
      state.lastActivityTime = Date.now();
      saveStateToLocalStorage(state); // Guardar en localStorage
    },
    
    logout: (state) => {
      state.login = null;
      state.isLoading = false;
      state.lastActivityTime = null;
      saveStateToLocalStorage(state); // Guardar en localStorage
    },
  },
});

export const { setLoading, setLogin, logout } = authSlice.actions;

export const checkInactiveTimeout = () => (dispatch, getState) => {
  const state = getState().auth;
  const inactiveTimeout = 8 * 60 * 60 * 1000;

  if (state.login && state.lastActivityTime) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - state.lastActivityTime;

    if (elapsedTime >= inactiveTimeout) {
      dispatch(logout());
    }
  }
};
