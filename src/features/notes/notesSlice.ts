import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ILabel, INote, IactionUpdatePayload } from '../../types';

// localStorage.setItem('notes', ''); // clear storage

const initialState: INote[] = JSON.parse(localStorage.getItem('notes') || '[]');

interface IUpdateLabel {
  notesIDs: string[];
  labelsIDs: string[];
}

function nextOrder(notes: INote[]) {
  let maxOrder = -1;

  notes.forEach(note => {
    if (maxOrder < note.order) {
      maxOrder = note.order;
    }
  });

  return maxOrder + 1;
}

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
        order: nextOrder(state),
        pinned: false,
        modifiedDate: Date.now(),
        labels: action.payload.label !== '' ? [ action.payload.label ] : []
      });
    },

    deleteNotes: (state, action: PayloadAction<string[] | string>) => {
      const notesToDelete = Array.isArray(action.payload) ? action.payload : [ action.payload ];
      let nextNotes: INote[] = state;

      for (const noteId of notesToDelete) {        
        const note = nextNotes.find(note => note.id === noteId);

        if (note) {
          if (note.trashed) {
            nextNotes = nextNotes.filter(el => note.id !== el.id);
          }

          note.trashed = true;
        }
      }

      return nextNotes;
    },

    restoreNotes: (state, action: PayloadAction<string[] | string>) => {
      const notesToRestore = Array.isArray(action.payload) ? action.payload : [ action.payload ];

      state.forEach(note => {
        if (notesToRestore.includes(note.id)) {
          note.trashed = false;
        }
      });
    },

    updateNote: (state, action: PayloadAction<IactionUpdatePayload>) => {
      const payload = action.payload;
      const targetNote = state.find(note => note.id === payload.id);

      if (!targetNote) return state;

      const d = Date.now();

      if (payload.title !== undefined) {
        targetNote.title = payload.title;
        targetNote.modifiedDate = d;
      }

      if (payload.text !== undefined) {
        targetNote.text = payload.text;
        targetNote.modifiedDate = d;
      }

      if (payload.bgColor !== undefined) targetNote.bgColor = payload.bgColor;
    },

    deleteLabelFromNotesById: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.forEach((note) => {
        const labelIdToDelete = note.labels.findIndex(label => label === id);

        if (labelIdToDelete !== -1) {
          note.labels.splice(labelIdToDelete, 1);
        }
      });
    },

    addLabelsToNotes: (state, action: PayloadAction<IUpdateLabel>) => {
      const { notesIDs, labelsIDs } = action.payload;
      
      notesIDs.forEach(noteId => {
        const note = state.find(note => note.id === noteId);

        if (note) {
          labelsIDs.forEach(labelId => {
            if (!note.labels.includes(labelId)) {
              note.labels.push(labelId);
            }
          });
        }
      });
    },

    deleteLabelsFromNotes: (state, action: PayloadAction<IUpdateLabel>) => {
      const { notesIDs, labelsIDs } = action.payload;
      
      notesIDs.forEach(noteId => {
        const note = state.find(note => note.id === noteId);

        if (note) {
          labelsIDs.forEach(labelId => {
            const labelIndex = note.labels.findIndex(label => label === labelId);
  
            if (labelIndex !== -1) {
              note.labels.splice(labelIndex, 1);
            }
          });
        }
      });
    },

    setLabelsToNote: (state, action: PayloadAction<{ labelsIDs: string[], noteId: string }>) => {
      const { noteId, labelsIDs } = action.payload;
      const note = state.find(note => note.id === noteId);
      
      if (note) {
        note.labels = labelsIDs;
      }
    },

    pinNote: (state, action: PayloadAction<string>) => {
      const note = state.find(note => note.id === action.payload);

      if (note) {
        if (!note.pinned) {
          note.order = nextOrder(state);
        }

        note.pinned = !note.pinned;
      }
    },

    pinNotes: (state, action: PayloadAction<string[]>) => {
      const IDs = action.payload;

      IDs.forEach(id => {
        const note = state.find(note => note.id === id);

        if (note) {
          if (!note.pinned) {
            note.order = nextOrder(state);
          }

          note.pinned = true;
        }
      });
    },

    unpinNotes: (state, action: PayloadAction<string[]>) => {
      const IDs = action.payload;

      IDs.forEach(id => {
        const note = state.find(note => note.id === id);

        if (note) {
          if (note.pinned) {
            note.pinned = false;
          }
        }
      });
    },
  }
});

export const selectAllNotes = (state: { notes: INote[] }) => state.notes;

export function getNotesByLabel(labelName: string, notes: INote[], labels: ILabel[]) {
  if (labelName === 'root') {
    return notes.filter(note => !note.trashed);
  }

  if (labelName === 'trash') {
    return notes.filter(note => note.trashed);
  }

  return notes.filter(note => {
    const currentLabel = labels.find(lbl => lbl.name === labelName);
    
    if (currentLabel) {
      const existsOnNote = note.labels.find(labelId => labelId === currentLabel.id);

      if (existsOnNote && !note.trashed) {
        return note;
      }
    }

    return false;
  })
}

export const notesSliceReducer = slice.reducer;
export const { 
  createNote, 
  deleteNotes, 
  updateNote, 
  deleteLabelFromNotesById, 
  addLabelsToNotes, 
  deleteLabelsFromNotes,
  setLabelsToNote,
  restoreNotes,
  pinNote,
  pinNotes,
  unpinNotes
} = slice.actions;