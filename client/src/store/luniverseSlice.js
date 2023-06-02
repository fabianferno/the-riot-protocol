import { createSlice } from '@reduxjs/toolkit';

export const luniverseSlice = createSlice({
  name: 'luniverse',
  initialState: {
    accessToken: '',
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const luniverseActions = luniverseSlice.actions;
