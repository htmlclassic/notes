import { createSlice } from "@reduxjs/toolkit";
import { LabelsType } from "../../types";

export enum reservedLabels {
  trash = 'Trash',
  all = 'All',
  empty = ''
};

let initialState: string[];

if (localStorage.getItem('labels')) {
  initialState = JSON.parse(localStorage.getItem('labels') as string);
} else {
  initialState = [ reservedLabels.all, reservedLabels.trash ];
}

const slice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    createLabel: (state, action) => {
      if (!state.includes(action.payload) && action.payload !== '') {
        state.push(action.payload);
      }
    },

    deleteLabel: (state, action) => {
      if (action.payload === 'All' || action.payload === 'Trash') {
        return state;
      }

      return state.filter(label => label !== action.payload);
    },

    updateLabel: (state, action) => {
      const index = state.findIndex(label => label === action.payload.oldLabelName);

      state[index] = action.payload.newLabelName;
    }
  }
});

export const selectLabels = (state: any) => state.labels;
export const labelsSliceReducer = slice.reducer;
export const { createLabel, deleteLabel, updateLabel } = slice.actions;