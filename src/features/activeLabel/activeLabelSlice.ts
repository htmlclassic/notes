import { createSlice } from '@reduxjs/toolkit';

const initialState: string | null = null;

const slice = createSlice({
  name: 'activeLabel',
  initialState,
  reducers: {
    update: (state, { payload }) => {
      return payload;
    }
  }
});

export const updateActiveLabel = slice.actions.update;
export const activeLabelReducer = slice.reducer;
export const selectActiveLabel = (state: any) => state.activeLabel;