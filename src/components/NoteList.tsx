import styled from "styled-components";
import { Note } from "./Note";
import { INote } from "../types";

interface NoteListProps {
  notes: INote[];
  dispatch: any;
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
      dispatch({
        type: 'delete',
        id
      });
    }
  };

  const handleChange = (newNote: INote) => {
    dispatch({
      type: 'update',
      ...newNote
    });
  }

  return (
    <StyledNotesBlock>
      {
        notes.slice(0).reverse().map(note =>
          <Note
            key={note.id}
            note={note}
            handleClick={() => handleClick(note.id!)}
            handleDelete={() => handleDelete(note.id!)}
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