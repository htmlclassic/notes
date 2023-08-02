import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILabel, IRootState } from '../../types';

let initialState: ILabel[] = JSON.parse(localStorage.getItem('labels') || '[]');

const slice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    createLabel: (state, action: PayloadAction<ILabel>) => {
      const { id, name } = action.payload;

      if (!id) return state;

      const labelExists = state.find(label => name === label.name)

      if (name && !labelExists) {
        state.push(action.payload);
      }
    },

    deleteLabel: (state, action: PayloadAction<string>) => {
      return state.filter(label => label.id !== action.payload);
    },

    updateLabel: (state, action: PayloadAction<ILabel>) => {
      const { id, name } = action.payload;

      if (!id) return state;

      const label = state.find(label => label.id === id);

      if (label) {
        label.name = name;
      }
    }
  }
});

export const selectLabels = (state: IRootState) => state.labels;
export const labelsSliceReducer = slice.reducer;
export const { createLabel, deleteLabel, updateLabel } = slice.actions;