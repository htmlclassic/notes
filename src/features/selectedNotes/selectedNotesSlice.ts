import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../../types';

const initialState: string[] = [];

interface ActionType {
  id: string;
}

const slice = createSlice({
  name: 'selectedNotes',
  initialState,
  reducers: {
    toggleSelectedNote: (state, action: PayloadAction<ActionType>) => {
      const { id } = action.payload;

      if (state.includes(id)) {
        const targetIndex = state.indexOf(id)!;

        state.splice(targetIndex, 1);
      } else {
        state.push(id);
      }
    },

    selectNotesByID: (state, action: PayloadAction<string[]>) => {
      const noteIDs = action.payload;

      noteIDs.forEach(noteId => {
        if (!state.includes(noteId)) {
          state.push(noteId);
        }
      });
    },

    removeSelection: (state) => {
      state.splice(0);
    }
  }
});

export const { toggleSelectedNote, removeSelection, selectNotesByID } = slice.actions;
export const selectedNotesReducer = slice.reducer;
export const selectSelectedNotes = (state: IRootState) => state.selectedNotes;