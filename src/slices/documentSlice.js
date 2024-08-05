// src/slices/documentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const documentSlice = createSlice({
  name: 'documents',
  initialState: {
    list: [],
    selectedDocument: null,
  },
  reducers: {
    addDocument: (state, action) => {
      state.list.push(action.payload);
    },
    selectDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
  },
});

export const { addDocument, selectDocument } = documentSlice.actions;
export default documentSlice.reducer;
