import { createSlice } from "@reduxjs/toolkit";

let initialState: string[] = JSON.parse(localStorage.getItem('labels') || '[]');

const slice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    createLabel: (state, action) => {
      if (
        action.payload &&
        !state.includes(action.payload) &&
        action.payload !== '' &&
        action.payload !== RESERVED_ARCHIVED_NOTES_LABEL
      ) {
        state.push(action.payload);
      }
    },

    deleteLabel: (state, action) => {
      return state.filter(label => label !== action.payload);
    },

    updateLabel: (state, action) => {
      const index = state.findIndex(label => label === action.payload.oldLabelName);

      state[index] = action.payload.newLabelName;
    }
  }
});

export const RESERVED_ARCHIVED_NOTES_LABEL = 'archived';
export const selectLabels = (state: any) => state.labels;
export const labelsSliceReducer = slice.reducer;
export const { createLabel, deleteLabel, updateLabel } = slice.actions;