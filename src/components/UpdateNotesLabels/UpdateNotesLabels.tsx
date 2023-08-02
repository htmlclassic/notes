import styled from "styled-components";
import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLabelsToNotes, deleteLabelsFromNotes } from "../../features/notes/notesSlice";
import Dialog from '@mui/material/Dialog';
import { selectLabels } from "../../features/labels/labelsSlice";
import { UpdateNotesLabelsContext } from '../../app/context';
import { Label } from "./Label";
import { LabelState } from "./types";

export function UpdateNotesLabels() {
  const { show } = useContext(UpdateNotesLabelsContext);

  return show ? <UpdateLabels /> : <></>;
}

function UpdateLabels() {
  const { notes, show, close } = useContext(UpdateNotesLabelsContext);
  const dispatch = useDispatch();
  const labels = useSelector(selectLabels);

  const getLabelState = (labelId: string) => {
    const notesHaveLabel: boolean[] = [];
    
    for (const note of notes) {
      notesHaveLabel.push(note.labels.includes(labelId));
    }

    let state = notesHaveLabel[0];

    for (let i = 1; i < notesHaveLabel.length; i++) {
      const prevValue = notesHaveLabel[i - 1];
      const currentValue = notesHaveLabel[i];

      if (currentValue !== prevValue) return LabelState.partially;
    }

    return state ? LabelState.all : LabelState.none;
  };

  const [labelsState, setLabelsState] = useState(
    labels.map(({ id }) => ({ labelId: id, state: getLabelState(id) }))
  );

  const updateLabels = () => {
    const allNotesIDs = notes.map(note => note.id);

    labelsState.forEach(item => {
      if (item.state === LabelState.all) {
        dispatch(addLabelsToNotes({ labelsIDs: [ item.labelId ], notesIDs: allNotesIDs }));
      } else if (item.state === LabelState.none) {
        dispatch(deleteLabelsFromNotes({ labelsIDs: [ item.labelId ], notesIDs: allNotesIDs }));
      }
    });
  };

  const handleClose = () => {
    close();
    updateLabels();
  };

  const list = labels.map(label =>
    <Label
      key={label.id}
      labelState={labelsState.find(({ labelId }) => labelId === label.id)!.state}
      labelName={label.name}
      labelId={label.id}
      isNoteSingle={notes.length === 1}
      handleChange={(opt: LabelState.all | LabelState.none) => {

        setLabelsState(
          labelsState.map(item => {
            if (item.labelId === label.id) {
              if (opt === LabelState.all) {
                return {
                  labelId: item.labelId,
                  state: LabelState.all
                };
              } else if (opt === LabelState.none) {
                return {
                  labelId: item.labelId,
                  state: LabelState.none
                };
              }
            }

            return item;
          })
        );
      }}
    />
  );

  return (
    <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <Dialog
        open={show}
        onClose={handleClose}
        onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <>
          <List>
            {
              list.length > 0
              ? <><span style={{alignSelf: 'center', marginBottom: 15}}>Labels</span> {list}</>
              : <div style={{ textAlign: 'center' }}>You don't have any labels yet.</div>
            }
          </List>
          <CloseButton onClick={handleClose}>Close</CloseButton>
        </>
      </Dialog>
    </div>
  );
}

const CloseButton = styled.button`
  --border-size: 2px;

  flex-grow: 0;
  align-self: flex-end;
  margin: 20px;
  padding: 10px 25px;
  border: 2px solid transparent;
  border-radius: 5px;
  background-color: transparent;

  transition: all 0.3s;
  position: relative;
  cursor: pointer;

  border-color: rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: rgba(0, 0, 0, 0.7);
  }
`;

const List = styled.ul`
  min-width: 400px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  padding: 30px 10px;
  overflow: auto;
`;