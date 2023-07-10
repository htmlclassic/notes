import styled from "styled-components";
import { Note } from "./Note";

import { useEffect } from 'react';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { selectNotes, updateNote, deleteNote } from "./notesSlice";
import { selectActiveNoteId, updateActiveNoteId } from "../activeNoteId/activeNoteIdSlice";
import { INote, IactionUpdatePayload } from "../../types";
import { useParams } from "react-router-dom";

export function NoteList() {
  const { label } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes).slice();
  const activeNoteId = useSelector(selectActiveNoteId);
  let notesList;

  if (label) {
    if (label === 'archived') {
      notesList = makeNotesList(
        notes.filter(note => note.trashed)
      );
    } else {
      notesList = makeNotesList(
        notes.filter(note => note.labels.includes(label) && !note.trashed)
      );
    }
  // show all notes
  } else {
    notesList = makeNotesList(
      notes.filter(note => !note.trashed)
    )
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.button === 0) {
        dispatch(updateActiveNoteId(''));
      }
    };

    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: string) => dispatch(deleteNote(id));

  function makeNotesList(notes: INote[]) {
    if (notes.length === 0) return null;

    return notes.reverse().map(note => 
      <Note
        key={note.id}
        note={note}
        isActive={note.id === activeNoteId}
        handleDelete={() => handleDelete(note.id)}
        handleClick={() => {
          dispatch(updateActiveNoteId(note.id));
        }}
      />
    );
  }

  return (
    <StyledNotesBlock>
      { notesList || `You don't have any notes yet.`}
    </StyledNotesBlock>
  );
}

const StyledNotesBlock = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;