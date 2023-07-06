import styled from "styled-components";
import { Note } from "./Note";

import { useEffect } from 'react';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { selectNotes, updateNote, deleteNote } from "./notesSlice";
import { selectActiveNoteId, updateActiveNoteId } from "../activeNoteId/activeNoteIdSlice";
import { INote, IactionUpdatePayload } from "../../types";
import { useSearchParams } from "react-router-dom";

// filter is so much hardcoded. gotta fix it
export function NoteList() {
  const filter = useSearchParams()[0].get('filter');
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const activeNoteId = useSelector(selectActiveNoteId);
  let notesList;

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.button === 0) {
        dispatch(updateActiveNoteId(null));
      }
    };

    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: string) => dispatch(deleteNote(id));

  const handleChange = (payload: IactionUpdatePayload) => {
    dispatch(updateNote(payload));
  };

  function makeNotesList(notes: INote[]) {
    if (notes.length === 0) return null;

    return notes.reverse().map(note => 
      <Note
        key={note.id}
        note={note}
        isActive={note.id === activeNoteId}
        handleDelete={() => handleDelete(note.id)}
        handleChange={handleChange}
        handleClick={() => {
          dispatch(updateActiveNoteId(note.id));
        }}
      />
    );
  }

  if (filter === null) {
    notesList = null;
  } else if (filter === 'All') {
    notesList = makeNotesList(notes.filter(note => !note.labels.includes('Trash')));
  } else {
    notesList = makeNotesList(notes.filter(note => note.labels.includes(filter)));
  }

  return (
    <StyledNotesBlock>
      { notesList || `No notes are found by label: ${filter}` }
    </StyledNotesBlock>
  );
}

const StyledNotesBlock = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;