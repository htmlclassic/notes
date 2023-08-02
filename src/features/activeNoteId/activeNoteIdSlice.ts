import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../../types';

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
export const selectActiveNoteId = (state: IRootState) => state.activeNoteId;