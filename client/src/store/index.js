import { configureStore } from '@reduxjs/toolkit';
import { infuraSlice } from './infuraSlice';
import { metamaskSlice } from './metamaskSlice';

const store = configureStore({
  reducer: {
    metamask: metamaskSlice.reducer,
    infura: infuraSlice.reducer,
  },
});
export default store;
