import { createSlice } from '@reduxjs/toolkit';

const initialState: string | null = null;

const slice = createSlice({
  name: 'activeNoteId',
  initialState,
  reducers: {
    update: (state, { payload }) => {
      return payload;
    }
  }
});

export const updateActiveNoteId = slice.actions.update;
export const activeNoteIdReducer = slice.reducer;
export const selectActiveNoteId = (state: any) => state.activeNoteId;