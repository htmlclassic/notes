import { useEffect, useState } from 'react';
import styled from "styled-components";

import { useDispatch } from 'react-redux';
import { pinNote, restoreNotes, updateNote } from './notesSlice';

import { ColorPanel } from '../../components/ColorPanel';
import { toggleSelectedNote } from '../selectedNotes/selectedNotesSlice';
import { useLoaderData } from 'react-router-dom';
import {
  ChangeBgColorButton,
  DeleteNotesButton,
  EditLabelsButton,
  PinNoteButton,
  SelectNotesButton,
  RestoreNotesButton
} from '../../components/Buttons';

interface ToolbarProps {
  noteId: string;
  isNoteSelected: boolean;
  isNotePinned: boolean;
  openUpdateNotesLabels: () => void;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: () => void;
}

export function Toolbar({
  noteId,
  isNoteSelected,
  isNotePinned,
  openUpdateNotesLabels,
  setBgColor,
  handleDelete,
}: ToolbarProps) {
  const dispatch = useDispatch();
  const [showColorPanel, setShowColorPanel] = useState(false);
  const inTrash = useLoaderData() === 'trash';

  useEffect(() => {
    const handler = () => setShowColorPanel(false);

    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, []);

  const handleRestore = () => {
    dispatch(restoreNotes(noteId));
  };

  const handlePin = () => {
    dispatch(pinNote(noteId));
  };

  return (
    <StyledToolbar>
      <SelectNotesButton
        onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
        title={isNoteSelected ? 'Deselect' : 'Select'}
        isSelected={isNoteSelected}
        onClick={() => {
          dispatch(toggleSelectedNote({ id: noteId }));
        }}
      />
      <Wrapper
        disabled={isNoteSelected}
        onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <PinNoteButton
          pinned={isNotePinned}
          onClick={handlePin}
          title={isNotePinned ? 'Unpin' : 'Pin'}
          disabled={isNoteSelected}
        />
        <EditLabelsButton
          onClick={openUpdateNotesLabels}
          title="Edit labels"
          disabled={isNoteSelected}
        />
        <ChangeBgColorButton
          title="Change background color"
          disabled={isNoteSelected}
          active={showColorPanel}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setShowColorPanel(!showColorPanel);
          }}
        />
        {
          inTrash &&
          <RestoreNotesButton
            title='Restore'
            onClick={handleRestore}
            disabled={isNoteSelected}
          />
        }
        <DeleteNotesButton
          title={inTrash ? 'Delete' : 'Remove'}
          disabled={isNoteSelected}
          onClick={handleDelete}
        />

        <ColorPanel
          onClick={color => {
            setShowColorPanel(false);
            setBgColor(color);
            dispatch(updateNote({
              id: noteId,
              bgColor: color
            }));
          }}
          show={showColorPanel}
        />
      </Wrapper>
    </StyledToolbar>
  );
}

const Wrapper = styled.div<any>`
  display: flex;
  transition: all 0.3s;

  ${({ disabled }) => disabled && (
    `
      position: relative;
      opacity: 0.2;

      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        z-index: 1;
      }
    `
  )}
`;

const TOOLBAR_SIDE_PADDING = '5px'; // px

const StyledToolbar = styled.div`
  padding: 0 ${TOOLBAR_SIDE_PADDING};
  display: flex;
  justify-content: space-between;
  gap: 3px;
`;