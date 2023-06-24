import { createSlice } from '@reduxjs/toolkit';

import { INote, IactionDelete, IactionUpdate } from '../../types';

const initialState: INote[] = JSON.parse(localStorage.getItem('notes') || '[]');

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: (state, action) => {
      state.push({
        id: action.payload,
        title: '',
        text: '',
        bgColor: '#ffffff',
        trashed: false
      });
    },

    deleteNote: (state, action: IactionDelete) => {
      const note = state.find(note => note.id === action.payload);

      if (note) {
        if (note.trashed) {
          return state.filter(el => note.id !== el.id);
        }

        note.trashed = true;
      }
    },

    updateNote: (state, action: IactionUpdate) => {
      const payload = action.payload;
      const targetNote = state.find(note => note.id === payload.id);

      if (!targetNote) return state;

      if (payload.title !== undefined) targetNote.title = payload.title;
      if (payload.text !== undefined) targetNote.text = payload.text;
      if (payload.bgColor !== undefined) targetNote.bgColor = payload.bgColor;
    }
  }
});

export const selectNotes = (state: { notes: INote[] }) => state.notes;
export const notesSliceReducer = notesSlice.reducer;
export const { createNote, deleteNote, updateNote } = notesSlice.actions;