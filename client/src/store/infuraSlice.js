import { createSlice } from '@reduxjs/toolkit';

export const infuraSlice = createSlice({
  name: 'infura',
  initialState: {
    sdk: null,
  },
  reducers: {
    setSdk: (state, action) => {
      state.sdk = action.payload;
    },
  },
});

export const infuraActions = infuraSlice.actions;
