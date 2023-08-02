import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteNotes, getNotesByLabel, pinNotes, restoreNotes, selectAllNotes, unpinNotes } from "../features/notes/notesSlice";
import { removeSelection, selectNotesByID } from "../features/selectedNotes/selectedNotesSlice";
import { useLoaderData } from "react-router-dom";
import { useContext } from 'react';
import { UpdateNotesLabelsContext } from "../app/context";
import { selectLabels } from "../features/labels/labelsSlice";

import {
  DeleteNotesButton,
  EditLabelsButton,
  PinNoteButton,
  SelectNotesButton,
  RestoreNotesButton
} from './Buttons';

interface Props {
  selectedNotesIDs: string[];
}

export function ControlPanel({ selectedNotesIDs }: Props) {
  const dispatch = useDispatch();

  const currentLabel = useLoaderData() as string;
  const allNotes = useSelector(selectAllNotes);
  const labels = useSelector(selectLabels);

  const inTrash = currentLabel === 'trash';
  const { open: openUpdateNotesLabels } = useContext(UpdateNotesLabelsContext);
  const selectedNotes = allNotes.filter(note => selectedNotesIDs.includes(note.id));

  const notes = getNotesByLabel(currentLabel, allNotes, labels);
  const allSelected = notes.length === selectedNotes.length;
  const allPinned = selectedNotes.filter(note => note.pinned).length === selectedNotes.length;

  const currentNotesIDs = getNotesByLabel(currentLabel, allNotes, labels).map(note => note.id);

  const handleDelete = () => {
    if (inTrash) {
      const answer = window.confirm(`You won't be able to restore these notes. Are you sure you want to delete them?`);

      if (answer) {
        dispatch(deleteNotes(selectedNotesIDs));
        dispatch(removeSelection());
      }
    } else {
        dispatch(deleteNotes(selectedNotesIDs));
        dispatch(removeSelection());
    }
  };

  const handleDeselectAll = () => {
    dispatch(removeSelection());
  };

  const handleRestore = () => {
    dispatch(restoreNotes(selectedNotesIDs));
    dispatch(removeSelection());
  };

  const handleSelectAll = () => {
    dispatch(selectNotesByID(currentNotesIDs));
  };

  return (
    <>
      {
        !!selectedNotesIDs.length &&
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 30
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }}>
            <SelectNotesButton
              isSelected={allSelected}
              title={allSelected ? 'Deselect all' : 'Select all'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                
                if (allSelected) handleDeselectAll();
                else handleSelectAll();
              }}
            />
            <span>{selectedNotesIDs.length}</span>
          </div>
          <Div>
            <PinNoteButton
              pinned={allPinned}
              title={allPinned ? 'Unpin all' : 'Pin all'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();

                if (allPinned) dispatch(unpinNotes(selectedNotesIDs));
                else dispatch(pinNotes(selectedNotesIDs));
              }}
            />
            <EditLabelsButton
              title="Change labels"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                openUpdateNotesLabels(selectedNotes);
              }}
            />
            {
              inTrash &&
              <RestoreNotesButton
                title="Restore"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                    handleRestore();
                  }}
              />
            }
            <DeleteNotesButton
              title={inTrash ? 'Delete' : 'Remove'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleDelete();
              }}
            />
          </Div>
        </div>
      }      
    </>
  ); 
}

const Div = styled.div`
  display: flex;
  gap: 10px;
`;