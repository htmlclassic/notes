import { configureStore } from "@reduxjs/toolkit";
import { notesSliceReducer } from "../features/notes/notesSlice";
import { activeNoteIdReducer } from "../features/activeNoteId/activeNoteIdSlice";

const store = configureStore({
  reducer: {
    notes: notesSliceReducer,
    activeNoteId: activeNoteIdReducer
  }
});

export default store;