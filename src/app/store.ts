import { configureStore } from "@reduxjs/toolkit";
import { notesSliceReducer } from "../features/notes/notesSlice";
import { activeNoteIdReducer } from "../features/activeNoteId/activeNoteIdSlice";
import { labelsSliceReducer } from "../features/labels/labelsSlice";
import { selectedNotesReducer } from "../features/selectedNotes/selectedNotesSlice";

const store = configureStore({
  reducer: {
    notes: notesSliceReducer,
    labels: labelsSliceReducer,
    activeNoteId: activeNoteIdReducer,
    selectedNotes: selectedNotesReducer
  }
});

export default store;