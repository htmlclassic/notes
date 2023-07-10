import { PayloadAction, createSlice } from "@reduxjs/toolkit";

let initialState: string[] = JSON.parse(localStorage.getItem('labels') || '[]');

const slice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    createLabel: (state, action: PayloadAction<string>) => {
      if (
        action.payload !== '' &&
        !state.includes(action.payload) &&
        action.payload !== RESERVED_ARCHIVED_NOTES_LABEL
      ) {
        state.push(action.payload);
      }
    },

    deleteLabel: (state, action: PayloadAction<string>) => {
      return state.filter(label => label !== action.payload);
    },

    updateLabel: (state, action) => {
      throw new Error('Updating label is not implemented yet.');
    }
  }
});

export const RESERVED_ARCHIVED_NOTES_LABEL = 'archived';
export const selectLabels = (state: any) => state.labels;
export const labelsSliceReducer = slice.reducer;
export const { createLabel, deleteLabel, updateLabel } = slice.actions;