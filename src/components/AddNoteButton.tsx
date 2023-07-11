import { nanoid } from '@reduxjs/toolkit';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../features/notes/notesSlice";
import { updateActiveNoteId } from "../features/activeNoteId/activeNoteIdSlice";
import { useNavigate, useParams } from "react-router-dom";
import { createLabel, selectLabels } from "../features/labels/labelsSlice";
import { RESERVED_ARCHIVED_NOTES_LABEL } from "../features/labels/labelsSlice";
import { SIDEBAR_PADDING } from "../styles/globalVars";

export function AddNoteButton() {
  let { label: labelName } = useParams();
  if (labelName === undefined) labelName = '';

  const labels = useSelector(selectLabels);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    navigate(`/${labelName}`);
  };

  return (
    <div style={{padding: SIDEBAR_PADDING}}>
      <AddNoteButtonStyled
        onClick={handleAddNote}
        disabled={labelName === RESERVED_ARCHIVED_NOTES_LABEL}
      >
        Add a note
      </AddNoteButtonStyled>
    </div>
  );
}

const AddNoteButtonStyled = styled.button<any>`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  user-select: none;
  font-size: inherit;

  display: inline-block;
  width: 100%;
  padding: 15px 0;
  cursor: pointer;

  ${({ disabled }) => disabled ?
    `cursor: not-allowed;` :

    `&:hover {
      background-color: #ffea70;
      border-color: transparent;
    }`
  }
`;