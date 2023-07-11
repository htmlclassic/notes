import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { INote, IactionUpdatePayload } from '../../types';

// localStorage.setItem('notes', ''); // clear storage

const initialState: INote[] = JSON.parse(localStorage.getItem('notes') || '[]');

const slice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<{ id: string; label: string; }>) => {
      state.push({
        id: action.payload.id,
        title: '',
        text: '',
        bgColor: '#ffffff',
        trashed: false,
        labels: action.payload.label !== '' ? [ action.payload.label ] : []
      });
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      const note = state.find(note => note.id === action.payload);

      if (note) {
        if (note.trashed) {
          return state.filter(el => note.id !== el.id);
        }

        note.trashed = true;
      }
    },

    deleteNotesByLabelId: (state, action: PayloadAction<string>) => {
      const notesToDelete =  state.filter(note => note.labels.includes(action.payload));

      notesToDelete.forEach(note => {
        if (note.trashed) {
          const targetIndex = state.findIndex(nt => nt.id === note.id);

          if (targetIndex !== -1) {
            state.splice(targetIndex, 1);
          }
        } else {
          note.trashed = true;
          note.labels = [];
        }
      });
    },

    updateNote: (state, action: PayloadAction<IactionUpdatePayload>) => {
      const payload = action.payload;
      const targetNote = state.find(note => note.id === payload.id);

      if (!targetNote) return state;

      if (payload.title !== undefined) targetNote.title = payload.title;
      if (payload.text !== undefined) targetNote.text = payload.text;
      if (payload.bgColor !== undefined) targetNote.bgColor = payload.bgColor;
      if (
        payload.label &&
        !targetNote.labels.includes(payload.label)
      ) {
        targetNote.labels.push(payload.label);
      }
    }
  }
});

export const selectNotes = (state: { notes: INote[] }) => state.notes;
export const notesSliceReducer = slice.reducer;
export const { createNote, deleteNote, deleteNotesByLabelId, updateNote } = slice.actions;