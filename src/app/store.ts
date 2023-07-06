import { configureStore } from "@reduxjs/toolkit";
import { notesSliceReducer } from "../features/notes/notesSlice";
import { activeNoteIdReducer } from "../features/activeNoteId/activeNoteIdSlice";
import { labelsSliceReducer } from "../features/labels/labelsSlice";
import { activeLabelReducer } from "../features/activeLabel/activeLabelSlice";

const store = configureStore({
  reducer: {
    notes: notesSliceReducer,
    activeNoteId: activeNoteIdReducer,

    labels: labelsSliceReducer,
    activeLabel: activeLabelReducer
  }
});

export default store;