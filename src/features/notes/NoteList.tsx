import styled from "styled-components";
import { Note } from "./Note";

import { useEffect } from 'react';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { selectNotes, deleteNote } from "./notesSlice";
import { selectActiveNoteId, updateActiveNoteId } from "../activeNoteId/activeNoteIdSlice";
import { INote } from "../../types";
import { useParams } from "react-router-dom";
import { selectLabels } from "../labels/labelsSlice";

export function NoteList() {
  const { label } = useParams();
  const labels = useSelector(selectLabels);
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes).slice();
  const activeNoteId = useSelector(selectActiveNoteId);
  let notesList;
  let inTrashLabel = false;

  if (label) {
    if (label === 'archived') {
      notesList = makeNotesList(
        notes.filter(note => note.trashed)
      );

      inTrashLabel = true;
    } else {
      notesList = makeNotesList(
        notes.filter(note => {
          const targetLabel = labels.find(label => note.labels.includes(label.id));

          return targetLabel?.name === label && !note.trashed ? note : false;
        })
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

  const handleDelete = (id: string) => {
    if (inTrashLabel) {
      const answer = window.confirm(`You won't be able to restore the note. Are you sure you want to delete it?`);

      if (answer) {
        dispatch(deleteNote(id));
      }
    } else {
      dispatch(deleteNote(id));
    }
  };

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