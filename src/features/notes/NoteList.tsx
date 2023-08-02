import styled from "styled-components";
import { Note } from "./Note";

import { useEffect } from 'react';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { selectAllNotes, deleteNotes, getNotesByLabel } from "./notesSlice";
import { selectActiveNoteId, updateActiveNoteId } from "../activeNoteId/activeNoteIdSlice";
import { INote } from "../../types";
import { useLoaderData } from "react-router-dom";
import { selectLabels } from "../labels/labelsSlice";
import { selectSelectedNotes, toggleSelectedNote } from "../selectedNotes/selectedNotesSlice";
import { NOTE_WIDTH } from "./styles";

export function NoteList({ selectionMode }: { selectionMode: boolean }) {
  const dispatch = useDispatch();

  const labels = useSelector(selectLabels);
  const notes = useSelector(selectAllNotes).slice();
  const selectedNotes = useSelector(selectSelectedNotes);
  const activeNoteId = useSelector(selectActiveNoteId);
  const currentLabel = useLoaderData() as string;

  const notesList = makeNotesList(getNotesByLabel(currentLabel, notes, labels));
  let inTrashLabel = false;

  if (currentLabel === 'trash') inTrashLabel = true;
    
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
        dispatch(deleteNotes(id));
      }
    } else {
      dispatch(deleteNotes(id));
    }
  };

  function makeNotesList(notes: INote[]) {
    if (notes.length === 0) return null;

    const pinnedNotes = notes.filter(note => note.pinned).sort((a, b) => b.order - a.order);
    const otherNotes = notes.filter(note => !note.pinned).sort((a, b) => b.order - a.order);
    const allNotes = [ ...pinnedNotes, ...otherNotes ];

    return allNotes.map(note => 
      <Note
        key={note.id}
        note={note}
        isActive={note.id === activeNoteId}
        isSelected={selectedNotes.includes(note.id)}
        handleDelete={() => handleDelete(note.id)}
        handleClick={() => {
          if (selectionMode) {
            dispatch(toggleSelectedNote({ id: note.id }))
          } else {
            dispatch(updateActiveNoteId(note.id));
          }
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
  display: grid;
  grid-template-columns: repeat(auto-fill, ${NOTE_WIDTH});
  justify-content: center;
  gap: 30px;
`;