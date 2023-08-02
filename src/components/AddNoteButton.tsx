import { nanoid } from '@reduxjs/toolkit';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../features/notes/notesSlice";
import { updateActiveNoteId } from "../features/activeNoteId/activeNoteIdSlice";
import { useLoaderData } from "react-router-dom";
import { createLabel, selectLabels } from "../features/labels/labelsSlice";
import { SIDEBAR_PADDING } from "../styles/globalVars";

export function AddNoteButton() {
  const currentRoute = useLoaderData() as string;
  let labelName = '';

  if (currentRoute !== 'root') labelName = currentRoute;

  const labels = useSelector(selectLabels);
  const dispatch = useDispatch();

  const handleAddNote = () => {
    const noteId = nanoid();
    const labelExist = labels.find(label => label.name === labelName);
    const labelId = labelExist ? labelExist.id : nanoid();

    if (labelName === '') {
      dispatch(createNote({ id: noteId, label: '' }));
    } else {
      dispatch(createNote({ id: noteId, label: labelId }));
    }

    dispatch(createLabel({ id: labelId, name: labelName as string }));
    dispatch(updateActiveNoteId(noteId));
  };

  return (
    <div style={{padding: SIDEBAR_PADDING}}>
      <AddNoteButtonStyled
        onClick={handleAddNote}
        disabled={labelName === 'trash'}
      >
        Add a note
      </AddNoteButtonStyled>
    </div>
  );
}

const AddNoteButtonStyled = styled.button<any>`
  background-color: #ffea70;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 5px;
  transition: all 0.3s;
  user-select: none;
  font-size: inherit;

  display: inline-block;
  width: 100%;
  padding: 15px 0;
  cursor: pointer;

  ${({ disabled }) => disabled ?
    `
      cursor: not-allowed;
      background-color: transparent;
      border-color: rgba(0, 0, 0, 0.1);
    ` :

    `&:hover {
      border-color: rgba(0, 0, 0, 0.6);
      border-style: solid;
    }`
  }
`;