import styled from "styled-components";
import { Note } from "./Note";

import { useEffect } from 'react';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { selectNotes, updateNote, deleteNote } from "../features/notes/notesSlice";
import { selectActiveNoteId, updateActiveNoteId } from "../features/activeNoteId/activeNoteIdSlice";
import { IactionUpdatePayload } from "../types";
import { Outlet } from "react-router-dom";

interface NoteListProps {
  filter: 'all' | 'archived'
}

export function NoteList({ filter }: NoteListProps) {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes).slice();
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

  if (filter === 'archived') {
    notesList = notes.filter(note => note.trashed);
  } else {
    notesList = notes.filter(note => !note.trashed);
  }

  return (
    <StyledNotesBlock>
      {
        notesList.reverse().map(note =>
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
      <Outlet />
    </StyledNotesBlock>
  );
}

const StyledNotesBlock = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;