import { createSlice } from '@reduxjs/toolkit';

import { INote, IactionDelete, IactionUpdate } from '../../types';
import { reservedLabels } from '../labels/labelsSlice';

// localStorage.setItem('notes', ''); // clear storage

const initialState: INote[] = JSON.parse(localStorage.getItem('notes') || '[]');

const slice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: (state, action) => {
      state.push({
        id: action.payload.id,
        title: '',
        text: '',
        bgColor: '#ffffff',
        labels: [ action.payload.activeLabel ]
      });
    },

    deleteNote: (state, action: IactionDelete) => {
      const note = state.find(note => note.id === action.payload);

      if (note) {
        if (note.labels.includes(reservedLabels.trash)) {
          return state.filter(el => note.id !== el.id);
        }

        note.labels = [reservedLabels.trash];
      }
    },

    updateNote: (state, action: IactionUpdate) => {
      const payload = action.payload;
      const targetNote = state.find(note => note.id === payload.id);

      if (!targetNote) return state;

      if (payload.title !== undefined) targetNote.title = payload.title;
      if (payload.text !== undefined) targetNote.text = payload.text;
      if (payload.bgColor !== undefined) targetNote.bgColor = payload.bgColor;
      if (
        payload.label !== undefined &&
        payload.label !== reservedLabels.empty &&
        payload.label !== reservedLabels.all &&
        payload.label !== reservedLabels.trash
      ) {
        // i mean it's cool that you reserved some words and dont let a user create a label like that
        // but how the fuck is he notified about it?
        targetNote.labels.push(payload.label);
      }
    }
  }
});

export const selectNotes = (state: { notes: INote[] }) => state.notes;
export const notesSliceReducer = slice.reducer;
export const { createNote, deleteNote, updateNote } = slice.actions;