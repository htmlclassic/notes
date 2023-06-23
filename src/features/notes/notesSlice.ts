import { createSlice } from '@reduxjs/toolkit';

import { INote } from '../../types';

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

    deleteNote: (state, { payload }) => {
      return state.filter(note => note.id !== payload);
    },

    updateNote: (state, { payload }) => {
      const targetNote = state.find(note => note.id === payload.id);

      if (!targetNote) return state;

      if (payload.title) targetNote.title = payload.title;
      if (payload.text) targetNote.text = payload.text;
      if (payload.bgColor) targetNote.bgColor = payload.bgColor;
    }
  }
});

export const selectNotes = (state: { notes: INote[] }) => state.notes;
export const notesSliceReducer = notesSlice.reducer;
export const { createNote, deleteNote, updateNote } = notesSlice.actions;