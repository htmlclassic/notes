import styled from "styled-components";
import { Note } from "./Note";
import { IAction, INote } from "../types";
import { Dispatch } from "react";
import { actions } from "../NotesManager";
import { IupdateNote } from "../types";

interface NoteListProps {
  notes: INote[];
  dispatch: Dispatch<IAction>;
  handleClick: (noteId: number) => void;
  activeNoteId: number;
}

export function NoteList({
  notes,
  dispatch,
  handleClick,
  activeNoteId
}: NoteListProps) {

  const handleDelete = (id: number) => {
    const answer = window.confirm(
      "Are you sure you want to delete the note?\nYou won't be able to restore it."
    );

    if (answer) {
      dispatch(actions.deleteNote(id));
    }
  };

  const handleChange = (payload: IupdateNote) => {
    dispatch(actions.updateNote(payload));
  }

  return (
    <StyledNotesBlock>
      {
        notes.slice(0).reverse().map(note =>
          <Note
            key={note.id}
            note={note}
            handleClick={() => handleClick(note.id)}
            handleDelete={() => handleDelete(note.id)}
            handleChange={handleChange}
            isActive={activeNoteId === note.id}
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