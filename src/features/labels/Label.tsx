import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteNotesByLabelId } from '../notes/notesSlice';
import { deleteLabel, updateLabel } from "./labelsSlice";
import { ILabel } from '../../types';

import { Input, Button, NavLinkStyled } from "./styles";
import styled from "styled-components";

import { ReactComponent as LabelI } from './assets/label-icon.svg';
import { ReactComponent as EditI } from './assets/edit-icon.svg';
import { ReactComponent as DeleteI } from './assets/delete-icon.svg';

interface LabelProps {
  label: ILabel;
}

export function Label({ label: { id, name } }: LabelProps) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (edit) {
    return (
      <Wrapper>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value)
          }}
          type="text"
          value={text}
          autoFocus={true}
        />
        <Button
          onClick={() => {
            if (text !== '') {
              dispatch(updateLabel({ id, name: text }));
              navigate(`/${text}`);
              setEdit(false);
            }
        }}
        >
          Save
        </Button>
      </Wrapper>
    );
  }

  return (
    <>
      <LabelIcon />
      <Navlink
        to={`/${name}`}
      >
        { name }
      </Navlink>
      <Div>
        <Btn
          onClick={() => {
            setEdit(true);
          }}
        >
          <EditIcon />
        </Btn>
        <Btn
          onClick={() => {
            dispatch(deleteLabel(id));
            dispatch(deleteNotesByLabelId(id));
            navigate('/');
          }}
        >
          <DeleteIcon />
        </Btn>
      </Div>
    </>
  );
}

const SIDE_PADDING = '5px';
const LABEL_ICON_SIZE = '20px';
const OTHER_ICON_SIZE = '15px';
const DIV_GAP = '10px';

const Navlink = styled(NavLinkStyled)`
  
`;

const LabelIcon = styled(LabelI)`
  width: ${LABEL_ICON_SIZE};
  height: ${LABEL_ICON_SIZE};
  flex-shrink: 0;
  position: absolute;
  left: ${SIDE_PADDING};
  top: 50%;
  transform: translateY(-50%);
`;

const SIZE = `
  width: ${OTHER_ICON_SIZE};
  height: ${OTHER_ICON_SIZE};
`;

const EditIcon = styled(EditI)`
  ${SIZE}
`;

const DeleteIcon = styled(DeleteI)`
  ${SIZE}
`;

const Div = styled.div`
  position: absolute;
  right: ${SIDE_PADDING};
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  gap: ${DIV_GAP};
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  background: transparent;
  border: 1px solid transparent;
  padding: 5px;
  cursor: pointer;
  border-radius: 10%;
  flex-shrink: 0;

  transition: all 0.3s;

  &:hover {
    border-color: rgba(0, 0, 0, 1);
  }
`;