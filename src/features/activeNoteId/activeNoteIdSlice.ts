import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = '';

const slice = createSlice({
  name: 'activeNoteId',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      return action.payload;
    }
  }
});

export const updateActiveNoteId = slice.actions.update;
export const activeNoteIdReducer = slice.reducer;
export const selectActiveNoteId = (state: any) => state.activeNoteId;