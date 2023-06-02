import { configureStore } from '@reduxjs/toolkit';
import { infuraSlice } from './infuraSlice';
import { metamaskSlice } from './metamaskSlice';
import { luniverseSlice } from './luniverseSlice';
const store = configureStore({
  reducer: {
    metamask: metamaskSlice.reducer,
    infura: infuraSlice.reducer,
    luniverse: luniverseSlice.reducer,
  },
});
export default store;
