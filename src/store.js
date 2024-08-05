// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import documentReducer from './slices/documentSlice';

const store = configureStore({
  reducer: {
    documents: documentReducer,
  },
});

export default store;
