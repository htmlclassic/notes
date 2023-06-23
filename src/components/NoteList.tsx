import styled from "styled-components";
import { Note } from "./Note";

import { useEffect } from 'react';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { selectNotes, updateNote, deleteNote } from "../features/notes/notesSlice";
import { selectActiveNoteId, updateActiveNoteId } from "../features/activeNoteId/activeNoteIdSlice";

export function NoteList() {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const activeNoteId = useSelector(selectActiveNoteId);

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

  const handleDelete = (id: string) => {
    const answer = window.confirm(
      "Are you sure you want to delete the note?\nYou won't be able to restore it."
    );

    if (answer) {
      dispatch(deleteNote(id));
    }
  };

  const handleChange = (payload: any) => {
    dispatch(updateNote(payload));
  }

  return (
    <StyledNotesBlock>
      {
        notes.slice(0).reverse().map(note =>
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
        )
      }
    </StyledNotesBlock>
  );
}

const StyledNotesBlock = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;